import "./PlayerSelector.css"

export default function PlayerSelector({
  optionsClick,
}: {
  optionsClick: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <>
      <form id="player">
        <fieldset form="player">
          <legend>Who are you?</legend>
          <div className="selection">
            <input
              onChange={(e) => optionsClick(e)}
              type="radio"
              id="player1"
              name="player"
              value="player1"
              defaultChecked={true}
            />
            <label htmlFor="player1">Player 1</label>
          </div>
          <div className="selection">
            <input
              onChange={(e) => optionsClick(e)}
              type="radio"
              id="player2"
              name="player"
              value="player2"
            />
            <label htmlFor="player2">Player 2</label>
          </div>
        </fieldset>
      </form>
    </>
  )
}
