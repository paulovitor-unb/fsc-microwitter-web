import { useState } from "react"

import { Home } from "./home"
import { Login } from "./login"
import { Signup } from "./signup"

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
