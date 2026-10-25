import { useState } from 'react'
import './App.css'
import carthooks from './Hooks/cart.hooks'

const app = () => {
    const [products, setProducts] = useState([
        {
            id: 1,
            img: "./image-2.jpeg",
            name: "White Stylish Shoe",
            price: "$50"


        },
        {
            id: 2,
            img: "./image-3.jpeg",
            name: "Jeans colour Shoe",
            price: "$40"

        },
        {
            id: 3,
            img: "./image-4.jpeg",
            name: "Red Edition Shoe",
            price: "$55"
        },
        {
            id: 4,
            img: "./image-5.jpeg",
            name: "Stylish Men Shoe",
            price: "$45"
        },
        {
            id: 5,
            img: "./image-6.jpeg",
            name: "Multi Coloured Shoe",
            price: "$66"
        },
        {
            id: 6,
            img: "./image-7.jpeg",
            name: "Collectable shoe",
            price: "$56"
        }
    ])
    let [increments ,setIncrements ] = useState(1)

    const increment = ()=>{
        setIncrements(prev => prev +1)
    }

    const { addToCart, cart, removeFromCart, updateQuantity} = carthooks()

    return (<>
        <div className='app-container grid grid-cols-2'>
            <div className='Products grid grid-cols-2 ' >{products.map(product => {
                return <>

                    <div className='Product-card' >
                        <img className='product-img' src={product.img} alt={product.name} width="100" />
                        <p className='product-name'>{product.name}</p>
                        <p className='product-price'>{product.price}</p>
                        <button className='product-button' onClick={() => addToCart(product)}>Add to Cart</button>
                    </div>

                </>

            })}
            </div>



            <div className='cart-section rounded-2xl'>
                <h1 className='bg-gray-100  mr-10 text-xl pl-10 py-3 mt-10'>cart</h1>
                <div className=''>{cart?.map(product => {
                    return <>
                        <div className='flex bg-gray-100 mr-10 align-middle pl-10 pt-10 gap-10 '>
                            <img className='img-cart  pb-2' src={product.img} alt={product.name} width="100" />
                            <div>
                                <p className='pt-5'>{product.name}</p>
                                <p>{product.price}</p>
                            </div>
                            <div className='flex ml-40'>
                                <button className='mr-5' onClick={()=> updateQuantity(product.id, product.quantity -1)}>-</button>
                                <p className='px-2 mt-8 mb-8 py-1 border'>{product.quantity}</p>
                                <button className='ml-5' onClick={()=> updateQuantity(product.id, product.quantity +1)}>+</button>
                                <button className='ml-10 border mt-10 mb-10' onClick={() => removeFromCart(product.id)}>🗑️</button>
                            </div>
                            {/* <button onClick={() => addToCart(product)}></button> */}
                        </div></>
                })}</div>
            </div>
        </div>

    </>)
}

export default app



