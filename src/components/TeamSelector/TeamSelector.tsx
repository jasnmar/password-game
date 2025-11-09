import "./TeamSelector.css"

export default function TeamSelector({
  optionsClick,
}: {
  optionsClick: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <>
      <h2>Team Selector</h2>
      <form id="team">
        <fieldset form="team">
          <legend>Team</legend>
          <div className="selection">
            <input
              onChange={(e) => optionsClick(e)}
              type="radio"
              id="A"
              name="team"
              value="A"
            />
            <label htmlFor="A">Team A</label>
          </div>
          <div className="selection">
            <input
              onChange={(e) => optionsClick(e)}
              type="radio"
              id="B"
              name="team"
              value="B"
            />
            <label htmlFor="B">Team B</label>
          </div>
        </fieldset>
      </form>
    </>
  )
}
