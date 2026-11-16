import React, { useContext, useState } from "react";
import NoteContext from "./context/notes/noteContext";


const Payment = ({ onBackToShopping }) => {
  const { cart, removeFromCart, updateQuantity, totalAmount } = useContext(NoteContext);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleConfirmPayment = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    if (paymentMethod === "card" && (!cardNumber || !expiryDate || !cvv)) {
      alert("Please fill in all credit card details.");
      return;
    }
    alert(`Payment of $${totalAmount.toFixed(2)} confirmed via ${paymentMethod === "card" ? "Credit Card" : "Cash on Delivery"}!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header / Navbar */}
      <div className="flex justify-between items-center border-b pb-4 mb-8">
        <h2 className="text-2xl font-bold">Shoe Store Checkout</h2>
        <div className="space-x-6 font-medium">
          <button onClick={onBackToShopping} className="hover:underline">Home</button>
          <span>Categories</span>
          <span>About Us</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        
        {/* Left Side: Payment Options & Card Form */}
        <div>
          <div className="flex items-center space-x-6 mb-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              <span>Cash on Delivery</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
              />
              <span>Credit Card</span>
            </label>
          </div>

          <form onSubmit={handleConfirmPayment}>
            {paymentMethod === "card" && (
              <div className="border border-gray-400 rounded-lg p-6 space-y-4 bg-white">
                <div>
                  <label className="block font-semibold mb-1">Enter your card number:</label>
                  <input
                    type="text"
                    placeholder="Card Number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full border rounded-full px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Enter your card's expiry date:</label>
                  <input
                    type="text"
                    placeholder="Expiry Date (MM/YY)"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full border rounded-full px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Enter your CVV number:</label>
                  <input
                    type="password"
                    placeholder="CVV"
                    maxLength="4"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="w-full border rounded-full px-4 py-2"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="mt-6 bg-amber-300 hover:bg-amber-400 font-semibold px-6 py-2 rounded-full"
            >
              Confirm Payment
            </button>
          </form>
        </div>

        {/* Right Side: Cart Summary from Context API */}
        <div className="bg-gray-100 p-6 rounded-2xl">
          <h3 className="text-xl font-bold mb-4">Cart</h3>

          {cart.length === 0 ? (
            <p className="text-gray-500 mb-4">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cart.map((product) => (
                <div key={product.id} className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center space-x-4">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-gray-600">{product.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(product.id, -1)}
                      className="px-2 py-1 border rounded"
                    >
                      -
                    </button>
                    <span>{product.quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, 1)}
                      className="px-2 py-1 border rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="ml-2 text-red-600 text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-lg font-bold mb-4">Total: ${totalAmount.toFixed(2)}</p>
            <button
              onClick={onBackToShopping}
              className="bg-amber-300 hover:bg-amber-400 font-semibold px-6 py-2 rounded-full"
            >
              Go back to shopping
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Payment;
