import { createContext } from "react"
import { type GameOptions } from "../interfaces.tsx"


export const GameOptionsContext = createContext<GameOptions>({gameType:"simple"})
