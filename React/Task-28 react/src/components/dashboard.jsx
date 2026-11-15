import React from 'react'
import '../App.css'

const Dashboard = () => {
  return (
    <>
    <div >
        <div className='dash-page'>
            <div className='dashPage-sub-1'>
                <div>
                    <img className='image-3' src="./image-3.avif" alt="img" />
                    <h2 className='my-name'>My Name</h2>
                    <p className='my-self'>Just me, myself and I, explore the universe of unknownment. I have a heart of love
                   and a interest of of this universe. I want to share my world with you. 
                    </p>
                </div>
                <div className='border'>
                    <h1>Popular Post</h1>
                    <div className='head-para'>
                        <img className='image-5' src="./image-5.avif" alt="img" />
                        <p className='para'>Lorem ipsum dolor sit amet.</p>
                    </div>
                    <div className='head-para'>
                        <img className='image-5' src="./image-6.avif" alt="img" />
                        <p className='para'>Lorem ipsum dolor sit amet.</p>
                    </div>
                    <div className='head-para'>
                        <img className='image-5' src="./image-7.avif" alt="img" />
                        <p className='para'>Lorem ipsum dolor sit amet.</p>
                    </div>
                </div>
            
            </div>
            <div className='dashPage-sub-2'>
                <img className='image-4' src="./image-4.avif" alt="img" />
                <h2>Title heading</h2>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                    Odio quia quasi inventore? Iusto sed provident quo pariatur 
                    consequatur, unde, veniam facilis corporis rerum voluptatum 
                    soluta vel natus iure aperiam tenetur.</p>
            </div>
        </div>
    </div>
    </>
  )
}

export default Dashboard
