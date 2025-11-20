
import "./CardDisplay.css"
import Word from "../Word/Word.tsx"
import Scoreboard from "../Scoreboard/Scoreboard.tsx"

interface CardDisplayProps {
  id: number
  words: string[]
  currentWordIndex: number
  guesses: number
  score: number[]
  currentTeam: string
  onGuess: () => void
  onCorrect: () => void
}

export default function CardDisplay({
  words,
  currentWordIndex,
  guesses,
  score,
  currentTeam,
  onGuess,
  onCorrect,
}: CardDisplayProps) {
  const wordList = []
  for (let i = 0; i < words.length; i++) {
    wordList.push(
      <Word
        key={i}
        word={words[i]}
        active={i == currentWordIndex ? true : false}
        guessClickHandler={onGuess}
        correctClickHandler={onCorrect}
        guessCount={guesses}
      />
    )
  }

  return (
    <div className="simple-card">
      <Scoreboard currentTeam={currentTeam} score={score} />
      <div className="words-container">
        {words.length > 0 ? (
          wordList
        ) : (
          <div className="guesser-view">
            <h3>Guesser View</h3>
            <p>Your partner is describing the words!</p>
          </div>
        )}
      </div>
    </div>
  )
}
