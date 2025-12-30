import { useState, useEffect } from "react"
import { ref, set, onValue, update } from "firebase/database"
import { db } from "../../firebase"
import data from "../../data.json"
import CardDisplay from "./CardDisplay"
import "./ManagedGame.css"

interface ManagedGameProps {
  userRole: string
}

export default function ManagedGame({ userRole }: ManagedGameProps) {
  const [gameId, setGameId] = useState("")
  const [inputGameId, setInputGameId] = useState("")
  const [joined, setJoined] = useState(false)
  const [error, setError] = useState("")

  // Game State
  const [cardId, setCardId] = useState(0)
  const [indexA, setIndexA] = useState(0)
  const [indexB, setIndexB] = useState(0)
  const [guesses, setGuesses] = useState(10)
  const [currentTeam, setCurrentTeam] = useState("A")
  const [score, setScore] = useState([0, 0])
  const [activeClueGiverRole, setActiveClueGiverRole] = useState("player1")

  useEffect(() => {
    if (!gameId) return

    const gameRef = ref(db, `games/${gameId}`)
    const unsubscribe = onValue(gameRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        setCardId(data.cardId)
        setIndexA(data.indexA || 0)
        setIndexB(data.indexB || 0)
        setGuesses(data.guesses)
        setCurrentTeam(data.currentTeam)
        setScore(data.score || [0, 0])
        setActiveClueGiverRole(data.activeClueGiverRole || "player1")
        setJoined(true)
        setError("")
      } else {
        setError("Game not found")
        setJoined(false)
      }
    })

    return () => unsubscribe()
  }, [gameId])

  function createGame() {
    const newGameId = Math.random().toString(36).substring(2, 6).toUpperCase()
    const initialCardId = Math.floor(Math.random() * data.length) + 1

    set(ref(db, `games/${newGameId}`), {
      cardId: initialCardId,
      indexA: 0,
      indexB: 0,
      guesses: 10,
      currentTeam: "A",
      score: [0, 0],
      activeClueGiverRole: "player1",
      createdAt: Date.now(),
    })
    setGameId(newGameId)
  }

  function joinGame() {
    if (inputGameId) {
      setGameId(inputGameId.toUpperCase())
    }
  }

  function switchTeams(cTeam: string) {
    return cTeam === "A" ? "B" : "A"
  }

  function switchRole(role: string) {
    return role === "player1" ? "player2" : "player1"
  }

  function resetGame() {
    const newCardId = Math.floor(Math.random() * data.length) + 1
    update(ref(db, `games/${gameId}`), {
      cardId: newCardId,
      indexA: 0,
      indexB: 0,
      guesses: 10,
      currentTeam: "A",
      score: [0, 0],
      activeClueGiverRole: "player1",
    })
  }

  function handleGuessClick() {
    if (userRole !== activeClueGiverRole) return // Only active clue giver can interact

    let newGuesses = guesses
    let newIndexA = indexA
    let newIndexB = indexB
    let newCurrentTeam = currentTeam
    let newActiveClueGiverRole = activeClueGiverRole

    if (guesses > 1) {
      // Wrong Guess
      newGuesses = guesses - 1
      // Switch Team, KEEP Role
      newCurrentTeam = switchTeams(currentTeam)
    } else {
      // Run out of guesses (Skip) -> Turn ends
      newGuesses = 10
      // Increment Index for CURRENT Role/List
      if (activeClueGiverRole === "player1") {
        newIndexA = indexA + 1
      } else {
        newIndexB = indexB + 1
      }
      // Switch Team AND Switch Role
      newCurrentTeam = switchTeams(currentTeam)
      newActiveClueGiverRole = switchRole(activeClueGiverRole)
    }

    // Check for end of card (simple loop)
    // const listA = data[cardId - 1].Awords
    // const listB = data[cardId - 1].Bwords
    // if (newIndexA >= listA.length) newIndexA = 0
    // if (newIndexB >= listB.length) newIndexB = 0

    update(ref(db, `games/${gameId}`), {
      guesses: newGuesses,
      indexA: newIndexA,
      indexB: newIndexB,
      currentTeam: newCurrentTeam,
      activeClueGiverRole: newActiveClueGiverRole,
    })
  }

  function handleCorrectWordClick() {
    if (userRole !== activeClueGiverRole) return // Only active clue giver can interact

    let newScore = [...score]
    let scoreValue = guesses

    // Determine current word list based on ROLE
    const currentWords =
      activeClueGiverRole === "player1"
        ? data[cardId - 1].Awords
        : data[cardId - 1].Bwords
    const currentIndex = activeClueGiverRole === "player1" ? indexA : indexB

    if (currentIndex === currentWords.length - 1) {
      scoreValue = guesses * 2
    }

    if (currentTeam === "A") {
      newScore[0] += scoreValue
    } else {
      newScore[1] += scoreValue
    }

    // Correct Guess -> Next Word, Switch Team, Switch Role
    let newIndexA = indexA
    let newIndexB = indexB
    let newGuesses = 10
    // let newCurrentTeam = switchTeams(currentTeam)
    let newActiveClueGiverRole = switchRole(activeClueGiverRole)

    if (activeClueGiverRole === "player1") {
      newIndexA = indexA + 1
    } else {
      newIndexB = indexB + 1
    }

    // Check for end of card
    // const listA = data[cardId - 1].Awords
    // const listB = data[cardId - 1].Bwords
    // if (newIndexA >= listA.length) newIndexA = 0
    // if (newIndexB >= listB.length) newIndexB = 0

    update(ref(db, `games/${gameId}`), {
      score: newScore,
      indexA: newIndexA,
      indexB: newIndexB,
      guesses: newGuesses,
      currentTeam: currentTeam,
      activeClueGiverRole: newActiveClueGiverRole,
    })
  }

  if (!joined) {
    return (
      <div className="lobby">
        <button onClick={createGame}>Create New Game</button>
        <div className="join-game">
          <input
            type="text"
            placeholder="Enter Game ID"
            value={inputGameId}
            onChange={(e) => setInputGameId(e.target.value)}
          />
          <button onClick={joinGame}>Join Game</button>
        </div>
        {error && <p className="error">{error}</p>}
      </div>
    )
  }

  // Determine words and index based on ACTIVE CLUE GIVER ROLE
  // P1 -> List A. P2 -> List B.
  let words: string[] = []
  let displayIndex = 0

  if (cardId > 0) {
    if (activeClueGiverRole === "player1") {
      words = data[cardId - 1].Awords
      displayIndex = indexA
    } else {
      words = data[cardId - 1].Bwords
      displayIndex = indexB
    }

    // Only show words if user is the active clue giver
    if (userRole !== activeClueGiverRole) {
      words = []
    }
  }

  const isGameOver =
    cardId > 0 &&
    indexA >= data[cardId - 1].Awords.length &&
    indexB >= data[cardId - 1].Bwords.length

  if (isGameOver) {
    return (
      <div className="managed-game">
        <div className="game-over">
          <h2>Game Over!</h2>
          <p>Final Score:</p>
          <div className="final-score">
            <p>Team A: {score[0]}</p>
            <p>Team B: {score[1]}</p>
          </div>
          <button onClick={resetGame}>Start New Game</button>
        </div>
      </div>
    )
  }

  return (
    <div className="managed-game">
      <div className="game-info">
        <p>Game ID: {gameId}</p>
        <p>You are: {userRole === "player1" ? "Player 1" : "Player 2"}</p>
        <p>Current Turn: Team {currentTeam}</p>
        <p>
          Clue Giver:{" "}
          {activeClueGiverRole === "player1" ? "Player 1" : "Player 2"}
        </p>
      </div>
      <CardDisplay
        id={cardId}
        words={words}
        currentWordIndex={displayIndex}
        guesses={guesses}
        score={score}
        currentTeam={currentTeam}
        onGuess={handleGuessClick}
        onCorrect={handleCorrectWordClick}
      />
    </div>
  )
}
