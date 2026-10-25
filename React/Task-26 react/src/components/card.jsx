import React from "react";

function card({ img, cardName, cardDescription }) {
    return (
        <>
            <div className="p-[2px] bg-gradient-to-r from-purple-500 via-blue-500 to-orange-500 rounded-2xl shadow-xl">
                <div className="bg-[#18181b] p-6 rounded-[14px] text-white flex flex-col items-center ">
                    <img className="w-full h-70 object-cover rounded-lg mb-4 " src={img} alt='card' />
                    <h1 className="text-xl text-purple-400">{cardName}</h1>
                    <p className="text-sm text-purple-600">{cardDescription}</p>
                </div>
            </div>
        </>
    )
}

export default card