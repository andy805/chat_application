import './App.css';
import {useState, useEffect} from 'react';
import MessageInput from './Components/MessageInput.js'
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import Login from './pages/Login.js'

const myMessages = ["test"];
let socket;


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [messages, setMessages] = useState(myMessages);
  const [currMessage, setCurrMessage] = useState("")


  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn') ;

    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, [])

  const connect = () => {
  socket = new WebSocket('ws://localhost:8080');
  socket.addEventListener('open' , function (ev) {
    socket.send("hello Server! this is from client using react");
  })


  socket.addEventListener('message', function (ev) {
    // myMessages.push(ev.data);
    setMessages(prevState => {
      return [ev.data, ...prevState];
    });
  })

}
const submitMessageHandler = (ev) => {

  ev.preventDefault(); //vanilla js that prevents the browser from reloading
  socket.send(currMessage)
  setCurrMessage("");
}

const textChangeHandler = (ev) => {
  setCurrMessage(ev.target.value)
}

const loginHandler = (username, password) => {
  localStorage.setItem('isLoggedIn' , '1');
  setIsLoggedIn(true);
}
  
  return (
   
    <div>
      <Switch>
        <Route path="/test">
          <h2>Test w</h2>
        </Route>
        <Route path="/user">
          <div>
            <form onSubmit={submitMessageHandler}>
              <input type="text" onChange={textChangeHandler} value={currMessage}></input>
              <button type="submit">send</button>

            </form>
            <button onClick={connect}>connect</button>
            {messages.map((message, index) => {
              return (<p key={index}>{message}</p>)})}
          </div>
        </Route>
        <Route path="/">
          {isLoggedIn && <Redirect to="/user"/>}
          {!isLoggedIn && <Login onLogin={loginHandler}/> }
        </Route>
      </Switch>
    </div>
  )
}

export default App;
