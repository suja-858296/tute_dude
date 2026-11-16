import React, { useState, useContext } from 'react';
import './App.css';
import Payment from './payment';
import NoteContext from './context/notes/noteContext';
import Navbar from './navbar';


const App = () => {
  const [products] = useState([
    { id: 1, img: "./image-2.jpeg", name: "White Stylish Shoe", price: "$50" },
    { id: 2, img: "./image-3.jpeg", name: "Jeans colour Shoe", price: "$40" },
    { id: 3, img: "./image-4.jpeg", name: "Red Edition Shoe", price: "$55" },
    { id: 4, img: "./image-5.jpeg", name: "Stylish Men Shoe", price: "$45" },
    { id: 5, img: "./image-6.jpeg", name: "Multi Coloured Shoe", price: "$66" },
    { id: 6, img: "./image-7.jpeg", name: "Collectable shoe", price: "$56" },
  ]);

  const [isPaymentPage, setIsPaymentPage] = useState(false);
  const { addToCart, cart, removeFromCart, updateQuantity, totalAmount } = useContext(NoteContext);

  if (isPaymentPage) {
    return <Payment onBackToShopping={() => setIsPaymentPage(false)} />;
  }

  return (
    <>
    <Navbar/>
    <div className='min-h-screen bg-white grid grid-cols-2 p-6 gap-6'>
      {/* Products Section */}
      <div className='grid grid-cols-2 gap-4'>
        {products.map((product) => (
          <div key={product.id} className='border p-4 rounded-xl shadow-sm flex flex-col items-center'>
            <img className='w-32 h-32 object-cover mb-2' src={product.img} alt={product.name} />
            <p className='font-semibold text-center'>{product.name}</p>
            <p className='text-gray-600 mb-2'>{product.price}</p>
            <button 
              className='bg-black text-white px-4 py-2 rounded-full text-sm mt-auto cursor-pointer hover:bg-gray-800'
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
        
      {/* Cart Section */}
      <div className='bg-gray-100 p-6 rounded-2xl flex flex-col justify-between'>
        <div>
          <h1 className='text-2xl font-bold mb-4 border-b pb-2'>Cart</h1>
          {cart.length === 0 ? (
            <p className='text-gray-500'>Your cart is empty.</p>
          ) : (
            <div className='space-y-4 max-h-[60vh] overflow-y-auto pr-2'>
              {cart.map((product) => (
                <div key={product.id} className='flex items-center justify-between bg-white p-3 rounded-lg shadow-xs'>
                  <div className='flex items-center space-x-3'>
                    <img className='w-12 h-12 object-cover rounded' src={product.img} alt={product.name} />
                    <div>
                      <p className='font-semibold text-sm'>{product.name}</p>
                      <p className='text-xs text-gray-600'>{product.price}</p>
                    </div>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <button className='px-2 border rounded' onClick={() => updateQuantity(product.id, -1)}>-</button>
                    <span className='text-sm'>{product.quantity}</span>
                    <button className='px-2 border rounded' onClick={() => updateQuantity(product.id, 1)}>+</button>
                    <button className='text-red-500 text-xs ml-2' onClick={() => removeFromCart(product.id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Proceed to Payment Button */}
        <div className='mt-6 border-t pt-4'>
          <p className='font-bold text-lg mb-3'>Total: ${totalAmount.toFixed(2)}</p>
          <button
            onClick={() => setIsPaymentPage(true)}
            className='w-full py-3 rounded-xl bg-amber-300 font-semibold hover:bg-amber-400 cursor-pointer'
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

App.displayName = "App";
export default App;
