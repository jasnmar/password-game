import type React from "react"
import "./Word.css"

export default function Word({
  word,
  active,
  guessClickHandler,
  correctClickHandler,
  guessCount,
}: {
  word: string
  active: boolean
  guessClickHandler: (e: React.MouseEvent<HTMLButtonElement>) => void
  correctClickHandler: (e: React.MouseEvent<HTMLButtonElement>) => void
  guessCount: number
}) {
  return (
    <div className="word-container">
      <span className="word">{active == true ? word : "*****"}</span>
      <span className="guesses">{active == true ? guessCount : ""}</span>
      {active == true ? (
        <button
          name="guess"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => guessClickHandler(e)}
        >
          Guess
        </button>
      ) : (
        ""
      )}
      {active == true ? (
        <button
          name="correct"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => correctClickHandler(e)}
        >
          Correct
        </button>
      ) : (
        ""
      )}
    </div>
  )
}
