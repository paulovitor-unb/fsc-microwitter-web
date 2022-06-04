import { useState } from "react"

import { Home } from "./pages/home"
import { Login } from "./pages/login"
import { Signup } from "./pages/signup"

export function App() {
    const [user, setUser] = useState()

    if (user) {
        return <Home loggedinUser={user} />
    }

    return window.location.pathname === "/signup" ? (
        <Signup signinUser={setUser} />
    ) : (
        <Login signinUser={setUser} />
    )
}
