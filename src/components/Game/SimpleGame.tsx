import { useState, useEffect } from "react"
import data from "../../data.json"
import CardDisplay from "./CardDisplay"

export default function SimpleGame({ id }: { id: number }) {
  //The word list on the card
  const [wordArray, setWordArray] = useState(data[id - 1].Awords)
  //The index of the current word
  const [cWordIndex, setCWordIndex] = useState(0)
  //The number of guesses left for the current word
  const [guesses, setGuesses] = useState(10)
  //The current team
  const [currentTeam, setCurrentTeam] = useState("A")
  //The score, index 0 is team A, index 1 is team B
  const [score, setScore] = useState([0, 0])

  //Reset the card when a new ID is put in the card
  useEffect(() => {
    setWordArray(data[id - 1].Awords)
    setCWordIndex(0)
    setGuesses(10)
    setScore([0, 0])
  }, [id])

  function switchTeams(cTeam: string) {
    if (cTeam === "A") {
      return "B"
    } else {
      return "A"
    }
  }

  function handleGuessClick(): void {
    if (guesses > 1) {
      setGuesses(guesses - 1)
    } else {
      setCWordIndex(cWordIndex + 1)
      setGuesses(10)
    }
    setCurrentTeam(switchTeams(currentTeam))
  }

  function updateScore() {
    let scoreValue = guesses
    if (cWordIndex === wordArray.length - 1) {
      scoreValue = guesses * 2
    }
    if (currentTeam === "A") {
      setScore([score[0] + scoreValue, score[1]])
    } else {
      setScore([score[0], score[1] + scoreValue])
    }
  }

  function handleCorrectWordClick() {
    updateScore()
    if (cWordIndex === wordArray.length - 1) {
      setCWordIndex(0)
    } else {
      setCWordIndex(cWordIndex + 1)
      setGuesses(10)
      setCurrentTeam(switchTeams(currentTeam))
    }
  }

  return (
    <CardDisplay
      id={id}
      words={wordArray}
      currentWordIndex={cWordIndex}
      guesses={guesses}
      score={score}
      currentTeam={currentTeam}
      onGuess={handleGuessClick}
      onCorrect={handleCorrectWordClick}
    />
  )
}
