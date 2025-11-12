import { createContext } from "react"
import { type UserContextType } from "../interfaces.tsx"


export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
})
