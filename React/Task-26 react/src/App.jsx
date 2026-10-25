import { useState } from 'react'
import './App.css'
import Card from './components/card'
import Header from './components/header'


function App() {
  const [count, setCount] = useState(0)

  return (  
    <>
      <Header />
      <div className='grid grid-cols-3'>
        <Card img='/image-1.avif' cardName='Card 1' cardDescription = 'This is card 1 Description' />
        <Card img='/image-2.avif' cardName='Card 2' cardDescription = 'This is card 2 Description' />
        <Card img='/image-3.avif' cardName='Card 3' cardDescription = 'This is card 3 Description' />
        <Card img='/image-4.avif' cardName='Card 4' cardDescription = 'This is card 4 Description' />
        <Card img='/image-5.avif' cardName='Card 5' cardDescription = 'This is card 5 Description' />
        <Card img='/image-6.avif' cardName='Card 6' cardDescription = 'This is card 6 Description'/>
        <Card img='/image-7.avif' cardName='Card 7' cardDescription = 'This is card 7 Description'/>
        <Card img='/image-8.avif' cardName='Card 8' cardDescription = 'This is card 8 Description'/>
        <Card img='/image-9.avif' cardName='Card 9' cardDescription = 'This is card 9 Description' />
        <Card img='/image-10.avif' cardName='Card 10' cardDescription = 'This is card 10 Description'/>
        <Card img='/image-11.avif' cardName='Card 11' cardDescription = 'This is card 11 Description'/>
        <Card img='/image-12.avif' cardName='Card 12' cardDescription = 'This is card 12 Description'/>
      </div>
    </>
  )
}

export default App
