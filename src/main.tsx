import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
// import UserAuthProvider from "./context/UserAuthProvider.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <UserAuthProvider> */}
      <App />
    {/* </UserAuthProvider> */}
  </StrictMode>
)
