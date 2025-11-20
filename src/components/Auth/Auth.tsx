import "./Auth.css"
import { app, db } from "../../firebase"
import { useContext } from "react"
import { UserContext } from "../../context/userAuth"
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth"
import { ref, set } from "firebase/database"
import googleg from "../../assets/googleg.svg"

export default function Auth() {
  const { user, setUser } = useContext(UserContext)

  const auth = getAuth(app)

  const provider = new GoogleAuthProvider()

  async function signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, provider)
      if (result) {
        console.log("result.user: ", result.user);
        setUser({
          displayName: result.user.displayName,
          accessToken: result.user.refreshToken,
        })
        set(ref(db, "users/" + result.user.uid), {
          username: result.user.displayName,
          profilePic: result.user.photoURL,
        })
      }
    } catch (error) {
      console.error("Error signing in with google: ", error)
    }
  }

  const initial = user?.displayName?.charAt(0).toUpperCase()
  
  return (
    <div className="auth">
      {!user ? (
        <div className="google-button" onClick={signInWithGoogle}>
          <img src={googleg} alt="Google Logo" />
        </div>
      ) : (
        <div className="initial-button" onClick={() => signOut(auth)}>
          <span >{initial}</span>
        </div>
      )}

    </div>
  )
}
