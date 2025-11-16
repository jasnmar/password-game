import { useState, useEffect, type ReactNode } from "react"
import { UserContext } from "./userAuth.tsx"
import app from "../firebase.ts"
import { type UserInfo } from "../interfaces.tsx"
import { getAuth, onAuthStateChanged, type User } from "firebase/auth"

export default function UserAuthProvider({
  children,
}: {
  children: ReactNode
}) {
  const [user, setUser] = useState<UserInfo | null>(null)
  const auth = getAuth(app)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser: User | null) => {
        setUser(
          firebaseUser
            ? {
                displayName: firebaseUser.displayName,
                accessToken: firebaseUser.refreshToken,
              }
            : null
        )
      }
    )

    return () => unsubscribe()
  }, [auth])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
