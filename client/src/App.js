import './App.css';
import {useState, useEffect} from 'react';
import MessageInput from './Components/MessageInput.js'
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import Login from './pages/Login.js';
import Main from './pages/Main.js';

const myMessages = ["test"];
let socket;
const users =[];


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
  /* send username and password to server
   * wait for response
   * responce will be a yes or no depending if username and password were correct
   * if its correct then login --> load all user specific stuff
   * else --> give error wrong credentials
   */

  const cred = {username: username, password:password};

  const fetchLogin = fetch("http://localhost:3000/", {
    method:"POST",
    headers: { 
      'Content-Type': "application/json"
    },
    body: JSON.stringify(cred)
  });
    fetchLogin.then(res => {
      console.log(res);
      alert("wow")
    }, rej => {
      console.log(rej);
      alert("rejection")
    });

  }

const logoutHandler = () => {
  localStorage.removeItem('isLoggedIn');
  setIsLoggedIn(false);
}
  
  return (
   
    <div>
      <Switch>
        <Route path="/test">
          <h2>Test w</h2>
        </Route>
        <Route path="/user">
          <Main/>
        </Route>
        <Route path="/">
          {!isLoggedIn && <Login onLogin={loginHandler}/> }
          {isLoggedIn && <Main onLogout={logoutHandler}/>}
        </Route>
      </Switch>
    </div>
  )
}

export default App;
