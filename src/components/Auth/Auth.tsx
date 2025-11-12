import app from "../../firebase"
import { useContext } from "react"
import { UserContext } from "../../context/userAuth"
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth"

export default function Auth() {
  const { user, setUser } = useContext(UserContext)

  const auth = getAuth(app)

  const provider = new GoogleAuthProvider()
  async function signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, provider)
      if (result) {
        setUser({
          displayName: result.user.displayName,
          accessToken: result.user.refreshToken,
        })
      }
      console.log("result: ", result.user)
    } catch (error) {
      console.error("Error signing in with google: ", error)
    }
  }

  return (
    <div>
      {!user ? (
        <button onClick={signInWithGoogle}>Login with Google</button>
      ) : (
        <button onClick={() => signOut(auth)}>Logout</button>
      )}
    </div>
  )
}
