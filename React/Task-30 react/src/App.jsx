import React, { useState, useEffect, useMemo } from "react";
import "./App.css";

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];
const INITIAL_TIME_SECONDS = 10 * 60; // 10 minutes per player

const PIECE_UNICODE = {
  w: { k: "♔", q: "♕", r: "♖", b: "♗", n: "♘", p: "♙" },
  b: { k: "♚", q: "♛", r: "♜", b: "♝", n: "♞", p: "♟" },
};

function createInitialBoard() {
  const board = Array.from({ length: 8 }, () => Array(8).fill(null));
  const backRank = ["r", "n", "b", "q", "k", "b", "n", "r"];

  for (let col = 0; col < 8; col++) {
    board[0][col] = { type: backRank[col], color: "w" };
    board[1][col] = { type: "p", color: "w" };
    board[6][col] = { type: "p", color: "b" };
    board[7][col] = { type: backRank[col], color: "b" };
  }
  return board;
}

function cloneBoard(board) {
  return board.map((row) =>
    row.map((cell) => (cell ? { ...cell } : null))
  );
}

function inBounds(row, col) {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
}

function coordsToAlgebraic(row, col) {
  return `${FILES[col]}${row + 1}`;
}

function formatTime(totalSeconds) {
  const safe = Math.max(0, totalSeconds);
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function findKing(board, color) {
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (piece && piece.color === color && piece.type === "k") {
        return { row: r, col: c };
      }
    }
  }
  return null;
}

/**
 * Checks whether square (targetRow, targetCol) is attacked by `attackerColor`.
 */
function isSquareAttacked(board, targetRow, targetCol, attackerColor) {
  const pawnDir = attackerColor === "w" ? 1 : -1;
  const pawnAttackRow = targetRow - pawnDir;
  if (inBounds(pawnAttackRow, targetCol - 1)) {
    const p = board[pawnAttackRow][targetCol - 1];
    if (p && p.color === attackerColor && p.type === "p") return true;
  }
  if (inBounds(pawnAttackRow, targetCol + 1)) {
    const p = board[pawnAttackRow][targetCol + 1];
    if (p && p.color === attackerColor && p.type === "p") return true;
  }

  const knightOffsets = [
    [-2, -1], [-2, 1], [-1, -2], [-1, 2],
    [1, -2], [1, 2], [2, -1], [2, 1],
  ];
  for (const [dr, dc] of knightOffsets) {
    const r = targetRow + dr;
    const c = targetCol + dc;
    if (inBounds(r, c)) {
      const p = board[r][c];
      if (p && p.color === attackerColor && p.type === "n") return true;
    }
  }

  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const r = targetRow + dr;
      const c = targetCol + dc;
      if (inBounds(r, c)) {
        const p = board[r][c];
        if (p && p.color === attackerColor && p.type === "k") return true;
      }
    }
  }

  const orthoDirs = [
    [-1, 0], [1, 0], [0, -1], [0, 1],
  ];
  for (const [dr, dc] of orthoDirs) {
    let r = targetRow + dr;
    let c = targetCol + dc;
    while (inBounds(r, c)) {
      const p = board[r][c];
      if (p) {
        if (p.color === attackerColor && (p.type === "r" || p.type === "q")) {
          return true;
        }
        break;
      }
      r += dr;
      c += dc;
    }
  }

  const diagDirs = [
    [-1, -1], [-1, 1], [1, -1], [1, 1],
  ];
  for (const [dr, dc] of diagDirs) {
    let r = targetRow + dr;
    let c = targetCol + dc;
    while (inBounds(r, c)) {
      const p = board[r][c];
      if (p) {
        if (p.color === attackerColor && (p.type === "b" || p.type === "q")) {
          return true;
        }
        break;
      }
      r += dr;
      c += dc;
    }
  }

  return false;
}

function isKingInCheck(board, color) {
  const kingPos = findKing(board, color);
  if (!kingPos) return false;
  const opponent = color === "w" ? "b" : "w";
  return isSquareAttacked(board, kingPos.row, kingPos.col, opponent);
}

/**
 * Generates pseudo-legal moves for piece at (row, col).
 */
function getPseudoLegalMoves(board, row, col, castlingRights, enPassantTarget) {
  const piece = board[row][col];
  if (!piece) return [];

  const { type, color } = piece;
  const opponent = color === "w" ? "b" : "w";
  const moves = [];

  if (type === "p") {
    const dir = color === "w" ? 1 : -1;
    const startRow = color === "w" ? 1 : 6;
    const promotionRow = color === "w" ? 7 : 0;

    const oneStepRow = row + dir;
    if (inBounds(oneStepRow, col) && !board[oneStepRow][col]) {
      if (oneStepRow === promotionRow) {
        for (const promo of ["q", "r", "b", "n"]) {
          moves.push({ toRow: oneStepRow, toCol: col, promotion: promo });
        }
      } else {
        moves.push({ toRow: oneStepRow, toCol: col });
      }

      const twoStepRow = row + dir * 2;
      if (row === startRow && inBounds(twoStepRow, col) && !board[twoStepRow][col]) {
        moves.push({
          toRow: twoStepRow,
          toCol: col,
          isDoublePawnPush: true,
        });
      }
    }

    for (const dc of [-1, 1]) {
      const capRow = row + dir;
      const capCol = col + dc;
      if (!inBounds(capRow, capCol)) continue;

      const targetPiece = board[capRow][capCol];
      if (targetPiece && targetPiece.color === opponent) {
        if (capRow === promotionRow) {
          for (const promo of ["q", "r", "b", "n"]) {
            moves.push({
              toRow: capRow,
              toCol: capCol,
              captured: targetPiece,
              promotion: promo,
            });
          }
        } else {
          moves.push({
            toRow: capRow,
            toCol: capCol,
            captured: targetPiece,
          });
        }
      } else if (
        enPassantTarget &&
        enPassantTarget.row === capRow &&
        enPassantTarget.col === capCol
      ) {
        const capturedPawnRow = row;
        const capturedPawn = board[capturedPawnRow][capCol];
        if (capturedPawn && capturedPawn.color === opponent && capturedPawn.type === "p") {
          moves.push({
            toRow: capRow,
            toCol: capCol,
            captured: capturedPawn,
            isEnPassant: true,
            capturedRow: capturedPawnRow,
            capturedCol: capCol,
          });
        }
      }
    }
  } else if (type === "n") {
    const offsets = [
      [-2, -1], [-2, 1], [-1, -2], [-1, 2],
      [1, -2], [1, 2], [2, -1], [2, 1],
    ];
    for (const [dr, dc] of offsets) {
      const r = row + dr;
      const c = col + dc;
      if (!inBounds(r, c)) continue;
      const target = board[r][c];
      if (!target) {
        moves.push({ toRow: r, toCol: c });
      } else if (target.color === opponent) {
        moves.push({ toRow: r, toCol: c, captured: target });
      }
    }
  } else if (type === "b" || type === "r" || type === "q") {
    const dirs = [];
    if (type === "b" || type === "q") {
      dirs.push([-1, -1], [-1, 1], [1, -1], [1, 1]);
    }
    if (type === "r" || type === "q") {
      dirs.push([-1, 0], [1, 0], [0, -1], [0, 1]);
    }

    for (const [dr, dc] of dirs) {
      let r = row + dr;
      let c = col + dc;
      while (inBounds(r, c)) {
        const target = board[r][c];
        if (!target) {
          moves.push({ toRow: r, toCol: c });
        } else {
          if (target.color === opponent) {
            moves.push({ toRow: r, toCol: c, captured: target });
          }
          break;
        }
        r += dr;
        c += dc;
      }
    }
  } else if (type === "k") {
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const r = row + dr;
        const c = col + dc;
        if (!inBounds(r, c)) continue;
        const target = board[r][c];
        if (!target) {
          moves.push({ toRow: r, toCol: c });
        } else if (target.color === opponent) {
          moves.push({ toRow: r, toCol: c, captured: target });
        }
      }
    }

    const homeRow = color === "w" ? 0 : 7;
    if (row === homeRow && col === 4 && !isSquareAttacked(board, homeRow, 4, opponent)) {
      const canKingside = color === "w" ? castlingRights.wK : castlingRights.bK;
      if (
        canKingside &&
        !board[homeRow][5] &&
        !board[homeRow][6] &&
        board[homeRow][7]?.type === "r" &&
        board[homeRow][7]?.color === color &&
        !isSquareAttacked(board, homeRow, 5, opponent) &&
        !isSquareAttacked(board, homeRow, 6, opponent)
      ) {
        moves.push({
          toRow: homeRow,
          toCol: 6,
          castleSide: "K",
        });
      }

      const canQueenside = color === "w" ? castlingRights.wQ : castlingRights.bQ;
      if (
        canQueenside &&
        !board[homeRow][1] &&
        !board[homeRow][2] &&
        !board[homeRow][3] &&
        board[homeRow][0]?.type === "r" &&
        board[homeRow][0]?.color === color &&
        !isSquareAttacked(board, homeRow, 3, opponent) &&
        !isSquareAttacked(board, homeRow, 2, opponent)
      ) {
        moves.push({
          toRow: homeRow,
          toCol: 2,
          castleSide: "Q",
        });
      }
    }
  }

  return moves;
}

/**
 * Applies a move on a cloned board and updates castling rights and en passant target.
 */
function simulateMove(board, fromRow, fromCol, move, castlingRights) {
  const nextBoard = cloneBoard(board);
  const movingPiece = nextBoard[fromRow][fromCol];
  const nextCastling = { ...castlingRights };
  let nextEnPassant = null;

  nextBoard[fromRow][fromCol] = null;

  if (move.isEnPassant) {
    nextBoard[move.capturedRow][move.capturedCol] = null;
  }

  if (move.castleSide === "K") {
    const homeRow = fromRow;
    const rook = nextBoard[homeRow][7];
    nextBoard[homeRow][7] = null;
    nextBoard[homeRow][5] = rook;
  } else if (move.castleSide === "Q") {
    const homeRow = fromRow;
    const rook = nextBoard[homeRow][0];
    nextBoard[homeRow][0] = null;
    nextBoard[homeRow][3] = rook;
  }

  nextBoard[move.toRow][move.toCol] = move.promotion
    ? { type: move.promotion, color: movingPiece.color }
    : movingPiece;

  if (move.isDoublePawnPush) {
    const epRow = (fromRow + move.toRow) / 2;
    nextEnPassant = { row: epRow, col: fromCol };
  }

  if (movingPiece.type === "k") {
    if (movingPiece.color === "w") {
      nextCastling.wK = false;
      nextCastling.wQ = false;
    } else {
      nextCastling.bK = false;
      nextCastling.bQ = false;
    }
  } else if (movingPiece.type === "r") {
    if (fromRow === 0 && fromCol === 0) nextCastling.wQ = false;
    if (fromRow === 0 && fromCol === 7) nextCastling.wK = false;
    if (fromRow === 7 && fromCol === 0) nextCastling.bQ = false;
    if (fromRow === 7 && fromCol === 7) nextCastling.bK = false;
  }

  if (move.toRow === 0 && move.toCol === 0) nextCastling.wQ = false;
  if (move.toRow === 0 && move.toCol === 7) nextCastling.wK = false;
  if (move.toRow === 7 && move.toCol === 0) nextCastling.bQ = false;
  if (move.toRow === 7 && move.toCol === 7) nextCastling.bK = false;

  return {
    nextBoard,
    nextCastling,
    nextEnPassant,
  };
}

/**
 * Returns all strictly legal moves (moves that do not leave own king in check).
 */
function getLegalMovesForSquare(board, row, col, castlingRights, enPassantTarget) {
  const piece = board[row][col];
  if (!piece) return [];

  const pseudoMoves = getPseudoLegalMoves(
    board,
    row,
    col,
    castlingRights,
    enPassantTarget
  );

  return pseudoMoves.filter((move) => {
    const { nextBoard } = simulateMove(board, row, col, move, castlingRights);
    return !isKingInCheck(nextBoard, piece.color);
  });
}

function hasAnyLegalMove(board, color, castlingRights, enPassantTarget) {
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (piece && piece.color === color) {
        const moves = getLegalMovesForSquare(
          board,
          r,
          c,
          castlingRights,
          enPassantTarget
        );
        if (moves.length > 0) return true;
      }
    }
  }
  return false;
}

/**
 * Builds Standard Algebraic Notation (SAN) for a move.
 */
function toSAN(
  boardBefore,
  fromRow,
  fromCol,
  move,
  castlingRightsBefore,
  enPassantBefore,
  boardAfter,
  opponentColor
) {
  const piece = boardBefore[fromRow][fromCol];
  const oppInCheck = isKingInCheck(boardAfter, opponentColor);
  const oppHasMoves = hasAnyLegalMove(
    boardAfter,
    opponentColor,
    castlingRightsBefore,
    null
  );
  const suffix = oppInCheck && !oppHasMoves ? "#" : oppInCheck ? "+" : "";

  if (move.castleSide === "K") return `O-O${suffix}`;
  if (move.castleSide === "Q") return `O-O-O${suffix}`;

  const destSquare = coordsToAlgebraic(move.toRow, move.toCol);
  const isCapture = Boolean(move.captured || move.isEnPassant);

  if (piece.type === "p") {
    const prefix = isCapture ? `${FILES[fromCol]}x` : "";
    const promo = move.promotion ? `=${move.promotion.toUpperCase()}` : "";
    return `${prefix}${destSquare}${promo}${suffix}`;
  }

  let disambiguation = "";
  const sameTypeCandidates = [];
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (r === fromRow && c === fromCol) continue;
      const other = boardBefore[r][c];
      if (other && other.color === piece.color && other.type === piece.type) {
        const legal = getLegalMovesForSquare(
          boardBefore,
          r,
          c,
          castlingRightsBefore,
          enPassantBefore
        );
        if (legal.some((m) => m.toRow === move.toRow && m.toCol === move.toCol)) {
          sameTypeCandidates.push({ row: r, col: c });
        }
      }
    }
  }

  if (sameTypeCandidates.length > 0) {
    const sameFile = sameTypeCandidates.some((p) => p.col === fromCol);
    const sameRank = sameTypeCandidates.some((p) => p.row === fromRow);
    if (!sameFile) {
      disambiguation = FILES[fromCol];
    } else if (!sameRank) {
      disambiguation = `${fromRow + 1}`;
    } else {
      disambiguation = `${FILES[fromCol]}${fromRow + 1}`;
    }
  }

  const pieceLetter = piece.type.toUpperCase();
  const capSymbol = isCapture ? "x" : "";
  return `${pieceLetter}${disambiguation}${capSymbol}${destSquare}${suffix}`;
}

export default function App() {
  const [board, setBoard] = useState(createInitialBoard);
  const [turn, setTurn] = useState("w");
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [legalMovesForSelected, setLegalMovesForSelected] = useState([]);
  const [lastMove, setLastMove] = useState(null);
  const [moveList, setMoveList] = useState([]);
  const [captured, setCaptured] = useState({ w: [], b: [] });
  const [castlingRights, setCastlingRights] = useState({
    wK: true,
    wQ: true,
    bK: true,
    bQ: true,
  });
  const [enPassantTarget, setEnPassantTarget] = useState(null);
  const [gameStatus, setGameStatus] = useState("playing");
  const [statusMessage, setStatusMessage] = useState("White's turn");
  const [historyStack, setHistoryStack] = useState([]);
  const [pendingPromotion, setPendingPromotion] = useState(null);

  const [whiteTime, setWhiteTime] = useState(INITIAL_TIME_SECONDS);
  const [blackTime, setBlackTime] = useState(INITIAL_TIME_SECONDS);
  const [clockPaused, setClockPaused] = useState(false);

  useEffect(() => {
    if (gameStatus !== "playing" || clockPaused || pendingPromotion) return;

    const interval = setInterval(() => {
      if (turn === "w") {
        setWhiteTime((prev) => {
          if (prev <= 1) {
            setGameStatus("timeout");
            setStatusMessage("Time out! Black wins on time.");
            return 0;
          }
          return prev - 1;
        });
      } else {
        setBlackTime((prev) => {
          if (prev <= 1) {
            setGameStatus("timeout");
            setStatusMessage("Time out! White wins on time.");
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [turn, gameStatus, clockPaused, pendingPromotion]);

  const checkedKingPos = useMemo(() => {
    if (isKingInCheck(board, "w")) return findKing(board, "w");
    if (isKingInCheck(board, "b")) return findKing(board, "b");
    return null;
  }, [board]);

  function executeMove(fromRow, fromCol, chosenMove) {
    const movingPiece = board[fromRow][fromCol];
    if (!movingPiece) return;

    setHistoryStack((prev) => [
      ...prev,
      {
        board: cloneBoard(board),
        turn,
        lastMove,
        moveList: [...moveList],
        captured: { w: [...captured.w], b: [...captured.b] },
        castlingRights: { ...castlingRights },
        enPassantTarget: enPassantTarget ? { ...enPassantTarget } : null,
        gameStatus,
        statusMessage,
      },
    ]);

    const { nextBoard, nextCastling, nextEnPassant } = simulateMove(
      board,
      fromRow,
      fromCol,
      chosenMove,
      castlingRights
    );

    const opponent = turn === "w" ? "b" : "w";
    const san = toSAN(
      board,
      fromRow,
      fromCol,
      chosenMove,
      castlingRights,
      enPassantTarget,
      nextBoard,
      opponent
    );

    if (chosenMove.captured) {
      setCaptured((prev) => ({
        ...prev,
        [turn]: [...prev[turn], chosenMove.captured],
      }));
    }

    const oppInCheck = isKingInCheck(nextBoard, opponent);
    const oppHasLegal = hasAnyLegalMove(
      nextBoard,
      opponent,
      nextCastling,
      nextEnPassant
    );

    let nextStatus = "playing";
    let nextMessage = `${opponent === "w" ? "White" : "Black"}'s turn`;

    if (!oppHasLegal) {
      if (oppInCheck) {
        nextStatus = "checkmate";
        nextMessage = `Checkmate! ${turn === "w" ? "White" : "Black"} wins!`;
      } else {
        nextStatus = "stalemate";
        nextMessage = "Draw by stalemate! No legal moves available.";
      }
    } else if (oppInCheck) {
      nextMessage = `Check! ${opponent === "w" ? "White" : "Black"} must defend the King.`;
    }

    setBoard(nextBoard);
    setCastlingRights(nextCastling);
    setEnPassantTarget(nextEnPassant);
    setMoveList((prev) => [...prev, san]);
    setLastMove({
      fromRow,
      fromCol,
      toRow: chosenMove.toRow,
      toCol: chosenMove.toCol,
    });
    setTurn(opponent);
    setSelectedSquare(null);
    setLegalMovesForSelected([]);
    setPendingPromotion(null);
    setGameStatus(nextStatus);
    setStatusMessage(nextMessage);
  }

  function handleSquareClick(row, col) {
    if (pendingPromotion) return;

    if (gameStatus !== "playing") {
      setStatusMessage(
        `Game over (${gameStatus}). Click "New Game" to play again.`
      );
      return;
    }

    const clickedPiece = board[row][col];

    if (selectedSquare) {
      const matchingMoves = legalMovesForSelected.filter(
        (m) => m.toRow === row && m.toCol === col
      );

      if (matchingMoves.length > 0) {
        if (matchingMoves.some((m) => m.promotion)) {
          setPendingPromotion({
            fromRow: selectedSquare.row,
            fromCol: selectedSquare.col,
            moves: matchingMoves,
          });
          return;
        }
        executeMove(selectedSquare.row, selectedSquare.col, matchingMoves[0]);
        return;
      }

      if (clickedPiece && clickedPiece.color === turn) {
        const moves = getLegalMovesForSquare(
          board,
          row,
          col,
          castlingRights,
          enPassantTarget
        );
        setSelectedSquare({ row, col });
        setLegalMovesForSelected(moves);
        if (moves.length === 0) {
          setStatusMessage("Illegal selection: that piece has no legal moves.");
        }
        return;
      }

      setSelectedSquare(null);
      setLegalMovesForSelected([]);
      setStatusMessage(
        `Illegal move to ${coordsToAlgebraic(row, col)}! Select a highlighted legal square.`
      );
      return;
    }

    if (!clickedPiece) {
      setStatusMessage("Select one of your pieces to see legal moves.");
      return;
    }

    if (clickedPiece.color !== turn) {
      setStatusMessage(
        `Illegal move: it is ${turn === "w" ? "White" : "Black"}'s turn.`
      );
      return;
    }

    const moves = getLegalMovesForSquare(
      board,
      row,
      col,
      castlingRights,
      enPassantTarget
    );
    setSelectedSquare({ row, col });
    setLegalMovesForSelected(moves);
    if (moves.length === 0) {
      setStatusMessage(
        "That piece cannot legally move right now (King would be in check or path is blocked)."
      );
    }
  }

  function handlePromotionSelect(promoType) {
    if (!pendingPromotion) return;
    const chosen =
      pendingPromotion.moves.find((m) => m.promotion === promoType) ||
      pendingPromotion.moves[0];
    executeMove(pendingPromotion.fromRow, pendingPromotion.fromCol, chosen);
  }

  function handleUndo() {
    if (historyStack.length === 0 || pendingPromotion) return;
    const previous = historyStack[historyStack.length - 1];
    setHistoryStack((prev) => prev.slice(0, -1));
    setBoard(previous.board);
    setTurn(previous.turn);
    setLastMove(previous.lastMove);
    setMoveList(previous.moveList);
    setCaptured(previous.captured);
    setCastlingRights(previous.castlingRights);
    setEnPassantTarget(previous.enPassantTarget);
    setGameStatus(previous.gameStatus);
    setStatusMessage(previous.statusMessage);
    setSelectedSquare(null);
    setLegalMovesForSelected([]);
  }

  function handleNewGame() {
    setBoard(createInitialBoard());
    setTurn("w");
    setSelectedSquare(null);
    setLegalMovesForSelected([]);
    setLastMove(null);
    setMoveList([]);
    setCaptured({ w: [], b: [] });
    setCastlingRights({ wK: true, wQ: true, bK: true, bQ: true });
    setEnPassantTarget(null);
    setGameStatus("playing");
    setStatusMessage("White's turn");
    setHistoryStack([]);
    setPendingPromotion(null);
    setWhiteTime(INITIAL_TIME_SECONDS);
    setBlackTime(INITIAL_TIME_SECONDS);
    setClockPaused(false);
  }

  const formattedMovePairs = useMemo(() => {
    const pairs = [];
    for (let i = 0; i < moveList.length; i += 2) {
      pairs.push({
        moveNum: Math.floor(i / 2) + 1,
        white: moveList[i],
        black: moveList[i + 1] || "",
      });
    }
    return pairs;
  }, [moveList]);

  const displayRows = [7, 6, 5, 4, 3, 2, 1, 0];

  const statusBannerModifier =
    gameStatus === "checkmate" || gameStatus === "timeout"
      ? "status-banner--danger"
      : checkedKingPos
      ? "status-banner--warning"
      : "";

  return (
    <div className="chess-page">
      <div className="chess-container">
        <div className="board-column">
          {/* Black Timer & Captured by White */}
          <div className="player-bar">
            <div className="player-info">
              <span
                className={`turn-badge ${
                  turn === "b" && gameStatus === "playing" ? "turn-badge--active" : ""
                }`}
              >
                Black
              </span>
              <div className="captured-row">
                {captured.w.length === 0 ? (
                  <span className="subtle-text">No captures</span>
                ) : (
                  captured.w.map((p, idx) => (
                    <span key={idx} className="captured-piece">
                      {PIECE_UNICODE[p.color][p.type]}
                    </span>
                  ))
                )}
              </div>
            </div>
            <div
              className={`timer-box ${
                turn === "b" && gameStatus === "playing" && !clockPaused
                  ? "timer-box--active"
                  : ""
              }`}
            >
              {formatTime(blackTime)}
            </div>
          </div>

          {/* 8x8 Chess Board */}
          <div className="board-wrapper">
            <div className="chess-board">
              {displayRows.map((row) =>
                [0, 1, 2, 3, 4, 5, 6, 7].map((col) => {
                  const isLight = (row + col) % 2 !== 0;
                  const piece = board[row][col];
                  const isSelected =
                    selectedSquare?.row === row && selectedSquare?.col === col;
                  const legalMove = legalMovesForSelected.find(
                    (m) => m.toRow === row && m.toCol === col
                  );
                  const isLastMoveSquare =
                    lastMove &&
                    ((lastMove.fromRow === row && lastMove.fromCol === col) ||
                      (lastMove.toRow === row && lastMove.toCol === col));
                  const isCheckedKing =
                    checkedKingPos?.row === row && checkedKingPos?.col === col;

                  const squareClasses = [
                    "chess-square",
                    isLight ? "chess-square--light" : "chess-square--dark",
                    isLastMoveSquare ? "chess-square--last-move" : "",
                    isSelected ? "chess-square--selected" : "",
                    isCheckedKing ? "chess-square--check" : "",
                  ]
                    .filter(Boolean)
                    .join(" ");

                  const coordColorClass = isLight ? "coord--on-light" : "coord--on-dark";

                  return (
                    <button
                      key={`${row}-${col}`}
                      type="button"
                      onClick={() => handleSquareClick(row, col)}
                      className={squareClasses}
                      aria-label={`${coordsToAlgebraic(row, col)}${
                        piece
                          ? ` ${piece.color === "w" ? "White" : "Black"} ${piece.type}`
                          : ""
                      }`}
                    >
                      {col === 0 && (
                        <span className={`coord coord--rank ${coordColorClass}`}>
                          {row + 1}
                        </span>
                      )}
                      {row === 0 && (
                        <span className={`coord coord--file ${coordColorClass}`}>
                          {FILES[col]}
                        </span>
                      )}

                      {legalMove && !piece && <span className="move-dot" />}
                      {legalMove && piece && <span className="capture-ring" />}

                      {piece && (
                        <span
                          className={`piece-glyph ${
                            piece.color === "w"
                              ? "piece-glyph--white"
                              : "piece-glyph--black"
                          }`}
                        >
                          {PIECE_UNICODE[piece.color][piece.type]}
                        </span>
                      )}
                    </button>
                  );
                })
              )}
            </div>

            {pendingPromotion && (
              <div className="modal-overlay">
                <div className="modal-card">
                  <h3 className="modal-title">Choose Promotion Piece</h3>
                  <div className="promo-options">
                    {["q", "r", "b", "n"].map((promoType) => (
                      <button
                        key={promoType}
                        type="button"
                        onClick={() => handlePromotionSelect(promoType)}
                        className="promo-button"
                      >
                        <span className="promo-glyph">
                          {PIECE_UNICODE[turn][promoType]}
                        </span>
                        <span className="promo-label">
                          {
                            { q: "Queen", r: "Rook", b: "Bishop", n: "Knight" }[
                              promoType
                            ]
                          }
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* White Timer & Captured by Black */}
          <div className="player-bar">
            <div className="player-info">
              <span
                className={`turn-badge ${
                  turn === "w" && gameStatus === "playing" ? "turn-badge--active" : ""
                }`}
              >
                White
              </span>
              <div className="captured-row">
                {captured.b.length === 0 ? (
                  <span className="subtle-text">No captures</span>
                ) : (
                  captured.b.map((p, idx) => (
                    <span key={idx} className="captured-piece">
                      {PIECE_UNICODE[p.color][p.type]}
                    </span>
                  ))
                )}
              </div>
            </div>
            <div
              className={`timer-box ${
                turn === "w" && gameStatus === "playing" && !clockPaused
                  ? "timer-box--active"
                  : ""
              }`}
            >
              {formatTime(whiteTime)}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="chess-sidebar">
          <h1 className="chess-heading">React Chess</h1>

          <div className={`status-banner ${statusBannerModifier}`}>
            <strong>Status:</strong> {statusMessage}
          </div>

          <div className="controls-row">
            <button
              type="button"
              onClick={handleUndo}
              disabled={historyStack.length === 0 || Boolean(pendingPromotion)}
              className="btn"
            >
              Undo Move
            </button>
            <button
              type="button"
              onClick={() => setClockPaused((p) => !p)}
              disabled={gameStatus !== "playing"}
              className="btn btn--secondary"
            >
              {clockPaused ? "Resume Timer" : "Pause Timer"}
            </button>
            <button type="button" onClick={handleNewGame} className="btn btn--primary">
              New Game
            </button>
          </div>

          <div className="material-box">
            <div className="section-title">Captured Pieces</div>
            <div className="material-row">
              <span>White captured:</span>
              <span>
                {captured.w.length
                  ? captured.w.map((p) => PIECE_UNICODE[p.color][p.type]).join(" ")
                  : "—"}
              </span>
            </div>
            <div className="material-row">
              <span>Black captured:</span>
              <span>
                {captured.b.length
                  ? captured.b.map((p) => PIECE_UNICODE[p.color][p.type]).join(" ")
                  : "—"}
              </span>
            </div>
          </div>

          <div className="move-list-box">
            <div className="section-title">Move List (SAN)</div>
            {formattedMovePairs.length === 0 ? (
              <p className="subtle-text">No moves played yet.</p>
            ) : (
              <div className="moves-scroll">
                {formattedMovePairs.map(({ moveNum, white, black }) => (
                  <div key={moveNum} className="move-row">
                    <span className="move-num">{moveNum}.</span>
                    <span className="san-move">{white}</span>
                    <span className="san-move">{black}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

