import "./Card.css"
import { useState, useEffect } from "react"
import data from "../../data.json"

export default function Card({ id }: { id: number }) {
  const [wordArray, setWordArray] = useState(data[id - 1].words)
  const [cWordIndex, setCWordIndex] = useState(0)

  const displayWord: string[] = []
  for (let i = 0; i < wordArray.length; i++) {
    if (i === cWordIndex) {
      displayWord.push(wordArray[i])
      continue
    }
    displayWord.push("*****")
  }

  useEffect(() => {
    setWordArray(data[id - 1].words)
    setCWordIndex(0)
  }, [id])

  function handleClick() {
    if (cWordIndex === wordArray.length - 1) {
      setCWordIndex(0)
    } else {
      setCWordIndex(cWordIndex + 1)
    }
    console.log(cWordIndex)
  }
  return (
    <div className="simple-card">
      <h2>Card {id}</h2>
      <button onClick={handleClick}>Next Word</button>
      <div className="word-container">
        <p>{displayWord[0]}</p>
        <p>{displayWord[1]}</p>
        <p>{displayWord[2]}</p>
        <p>{displayWord[3]}</p>
        <p>{displayWord[4]}</p>
      </div>
    </div>
  )
}
