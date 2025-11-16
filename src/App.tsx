import { useState, useContext } from "react"
import Card from "./components/Card/Card.tsx"
import Auth from "./components/Auth/Auth.tsx"
import Options from "./components/Options/Options.tsx"
import Logo from "./components/Logo/Logo.tsx"
import { UserContext } from "./context/userAuth.tsx"
import data from "./data.json"
// import passwordLogo from "./assets/password-logo.svg"
import "./App.css"
// import TeamSelector from "./components/TeamSelector/TeamSelector.tsx"

export default function App() {
  const [cardId, setCardId] = useState(0)
  const { user } = useContext(UserContext)
  const [gameType, setGameType] = useState("simple")

  function loadCard() {
    setCardId(Math.floor(Math.random() * data.length))
  }

  function handleGameTypeClick(e: React.ChangeEvent<HTMLInputElement>) {
    setGameType(e.target.value)
  }

  return (
    <>
      <header>
        <Logo />
        <Auth />
      </header>
      <main>
        {user && <p>Welcome, {user.displayName}!</p>}
        {user && (
          <Options
            gameType={gameType}
            optionsClick={(e) => handleGameTypeClick(e)}
          />
        )}
        <button onClick={loadCard}>New Game</button>
        {/* {gameType === "managed" ? <TeamSelector optionsClick={(e) => handleTeamClick(e)}/> : ""} */}
        {/* {cardId === 0 ? "" : <Card id={cardId} gameType={gameType} />} */}
        {cardId === 0 ? "" : <Card id={cardId} />}
        {/* {gameOptions.gameType} */}
      </main>
    </>
  )
}
