export interface GameOptions {
  gameType: string
}

export interface UserInfo {
  accessToken: string
  displayName: string | null
}


export interface UserContextType {
  user: UserInfo | null
  setUser: (user: UserInfo | null) => void
}