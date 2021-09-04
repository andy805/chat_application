import React from 'react'
import {useState} from 'react'


const Login = (props) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const inputUsernameHandler = (ev) => {
        setUsername(ev.target.value)
    }
    const inputPasswordHandler = (ev) => {
        setPassword(ev.target.value)
    }

    const loginSubmitHandler = (ev) => {
        ev.preventDefault();
        props.onLogin(username, password);
        setUsername("");
        setPassword("");
    }

    return (
        <form onSubmit={loginSubmitHandler} method="post" action="/">
            <label>Username</label>
            <input type="text" onChange={inputUsernameHandler} value={username}></input>
            <label>Password</label>
            <input type="password" onChange={inputPasswordHandler} value={password}></input>
            <button type="submit">login</button>
        </form>
    )
}

export default Login;