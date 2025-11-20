import PlayerSelector from "../PlayerSelector/PlayerSelector"
import "./Options.css"

export default function Options({
  gameType,
  optionsClick,
  playerClick,
}: {
  gameType: string
  optionsClick: (e: React.ChangeEvent<HTMLInputElement>) => void
  playerClick: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <>
      <form id="options">
        <fieldset form="options">
          <legend>Options</legend>
          <div className="selection">
            <input
              onChange={(e) => optionsClick(e)}
              defaultChecked={gameType === "simple" ? true : false}
              type="radio"
              id="simple"
              name="gameType"
              value="simple"
            />
            <label htmlFor="simple">Simple</label>
          </div>
          <div className="selection">
            <input
              onChange={(e) => optionsClick(e)}
              defaultChecked={gameType === "managed" ? true : false}
              type="radio"
              id="managed"
              name="gameType"
              value="managed"
            />
            <label htmlFor="managed">Managed</label>
          </div>
        </fieldset>
        <PlayerSelector optionsClick={playerClick} />
      </form>
    </>
  )
}
