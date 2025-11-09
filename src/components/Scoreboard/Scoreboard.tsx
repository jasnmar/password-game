import "./Scoreboard.css"


export default function Scoreboard({currentTeam}:{currentTeam:string}) {
  return (
    <div className="scoreboard">
      <h2>Scoreboard</h2>
      {currentTeam}
      <div>Score A</div>
      <div>Score B</div>
    </div>
  )
}