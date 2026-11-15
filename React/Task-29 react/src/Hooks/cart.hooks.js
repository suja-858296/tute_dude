import React from 'react'
import { useState } from 'react'


const carthooks = () => {

    const [cart, setCart] = useState([])

    const addToCart = (product) => {
        let exist = cart?.find(prd => prd.id === product.id)
        if (exist) return
        setCart(prv => [...prv, { ...product, quantity:1}])

    }

    const removeFromCart = (id) => {
        setCart(prv => prv.filter(prd => prd.id !== id))
    }

    const updateQuantity = (productId, newQuantity) =>{
        if (newQuantity <= 0){
            removeFromCart(productId)
            return;
        }
        setCart(cart.map(item => 
            item.id === productId ? { ...item, quantity:newQuantity}: item
        ))
    }

    return { addToCart, cart, removeFromCart,updateQuantity }
}



export default carthooks
