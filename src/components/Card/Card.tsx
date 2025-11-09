import "./Card.css"
import { useState, useEffect } from "react"
import Word from "../Word/Word.tsx"
import data from "../../data.json"
// import Scoreboard from "../Scoreboard/Scoreboard.tsx"

export default function Card({ id }: { id: number, }) {
  //The word list on the card
  const [wordArray, setWordArray] = useState(data[id - 1].Awords)
  //The index of the current word
  const [cWordIndex, setCWordIndex] = useState(0)
  //The number of guesses left for the current word
  const [guesses, setGuesses] = useState(10)
  //The current team
  const [currentTeam, setCurrentTeam] = useState("A")



  function switchTeams(cTeam: string) {
    if(cTeam === "A") {
      return "B"
    } else {
      return "A"
    }

  }
  //Setting up stuff for the wordlist
  function handleGuessClick(): void {
    if(guesses>1) {
      setGuesses(guesses - 1)
    } else {
      setCWordIndex(cWordIndex + 1)
      setGuesses(10)
    }
    setCurrentTeam(switchTeams(currentTeam))
  }

  const wordList = []
  for (let i = 0; i < wordArray.length; i++) {
    wordList.push(
      <Word
        key={i}
        word={wordArray[i]}
        active={i == cWordIndex ? true : false}
        guessClickHandler={() => handleGuessClick()}
        correctClickHandler={() => handleNextWordClick()}
        guessCount={guesses}
      />
    )
  }

  useEffect(() => {
    setWordArray(data[id - 1].Awords)
    setCWordIndex(0)
    setGuesses(10)
  }, [id])

  function handleNextWordClick() {
    if (cWordIndex === wordArray.length - 1) {
      setCWordIndex(0)
    } else {
      setCWordIndex(cWordIndex + 1)
      setGuesses(10)
      setCurrentTeam(switchTeams(currentTeam))
    }
  }

  return (
    <div className="simple-card">
      <h2>Card {id}</h2>
      {/* {gameType === "managed" ? <Scoreboard currentTeam={currentTeam} />: ""} */}
      <p>Current Team: {currentTeam}</p>
      <div className="words-container">{wordList}</div>
    </div>
  )
}
