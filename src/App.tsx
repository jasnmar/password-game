import { useState, useContext } from "react"
// import Card from "./components/Card/Card.tsx"
import SimpleGame from "./components/Game/SimpleGame.tsx"
import ManagedGame from "./components/Game/ManagedGame.tsx"
import Auth from "./components/Auth/Auth.tsx"
import Options from "./components/Options/Options.tsx"
import Logo from "./components/Logo/Logo.tsx"
import { UserContext } from "./context/userAuth.tsx"
import data from "./data.json"
// import passwordLogo from "./assets/password-logo.svg"
import "./App.css"

export default function App() {
  const [cardId, setCardId] = useState(0)
  const { user } = useContext(UserContext)
  const [gameType, setGameType] = useState("simple")
  const [userRole, setUserRole] = useState("player1")

  function loadCard() {
    setCardId(Math.floor(Math.random() * data.length) + 1)
  }

  function handleGameTypeClick(e: React.ChangeEvent<HTMLInputElement>) {
    setGameType(e.target.value)
  }

  function handlePlayerClick(e: React.ChangeEvent<HTMLInputElement>) {
    setUserRole(e.target.value)
  }

  return (
    <>
      <header>
        <Logo />
        <Auth />
      </header>

      <main>
        {user && <p className="welcome">Welcome, {user.displayName}!</p>}
        {user && (
          <Options
            gameType={gameType}
            optionsClick={(e) => handleGameTypeClick(e)}
            playerClick={(e) => handlePlayerClick(e)}
          />
        )}
        
        {gameType === "simple" && (
           <>
             <button className="new-game-button" onClick={loadCard}>New Game</button>
             {cardId > 0 && <SimpleGame id={cardId} />}
           </>
        )}

        {gameType === "managed" && (
          <ManagedGame userRole={userRole} />
        )}
      </main>
    </>
  )
}
