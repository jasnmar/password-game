import "./Scoreboard.css"


export default function Scoreboard({currentTeam, score}:{currentTeam:string, score:number[]}) {

  return (
    <div className="scoreboard">
      <div className={currentTeam === "A" ? "active" : ""}>Team A: {score[0]}</div>
      <div className={currentTeam === "B" ? "active" : ""}>Team B: {score[1]}</div>
    </div>
  )
}