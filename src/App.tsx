import { useState } from 'react'
import  Card  from './components/Card/Card.tsx'
import data from './data.json'
import './App.css'

export default function App() {
  const [cardId, setCardId] = useState(0)
  function loadCard() {
    setCardId(Math.floor(Math.random() * data.length))
  }



  return (
    <>
    <h1>Password Game</h1>
    <button onClick={loadCard}>New Random Game</button>
    {cardId === 0 ? "" : <Card id={cardId}/> }

    
    </>
  )
}
