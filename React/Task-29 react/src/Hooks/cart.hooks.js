import { useContext } from "react";
import NoteContext from "../context/notes/noteContext";

export const carthooks = ()=>{
    return useContext(NoteContext);
}
export default carthooks