import { useState, useContext } from "react"
import Card from "./components/Card/Card.tsx"
import Options from "./components/Options/Options.tsx"
import data from "./data.json"
import passwordLogo from "./assets/password-logo.svg"
import "./App.css"
import { GameOptionsContext } from "./context/GameOptionsContext.tsx"


export default function App() {
  const [cardId, setCardId] = useState(0)
  function loadCard() {
    setCardId(Math.floor(Math.random() * data.length))
  }
  const gameOptions = useContext(GameOptionsContext)

  return (
    <main>
      <img src={passwordLogo} alt="Password Logo" />
      <Options />
      <button onClick={loadCard}>New Game</button>
      {cardId === 0 ? "" : <Card id={cardId} />}
      {/* {gameOptions.gameType} */}
    </main>
  )
}
