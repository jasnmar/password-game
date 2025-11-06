import "./Options.css"
import { useContext } from "react"
import { GameOptionsContext } from "../../context/GameOptionsContext.tsx"




export default function Options() {
  const gameOptions = useContext(GameOptionsContext)
  console.log(gameOptions.gameType)

  function optionsClick(e: React.ChangeEvent<HTMLInputElement>) {
    gameOptions.gameType = e.target.value
    console.log(gameOptions.gameType)
  }
  
  return (
    <>
      <fieldset>
        <legend>Game Type</legend>
        <div className="selection">
          <input onChange={(e) => optionsClick(e)} defaultChecked={gameOptions.gameType === "simple" ? true : false}  type="radio" id="simple" name="gameType" value="simple" />
          <label htmlFor="simple">Simple</label>
        </div>
        <div className="selection">
          <input onChange={(e) => optionsClick(e)} defaultChecked={gameOptions.gameType === "managed" ? true : false} type="radio" id="managed" name="gameType" value="managed" />
          <label htmlFor="managed">Managed</label>
        </div>
      </fieldset>
    </>
  )
}
