import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import MessageInput from './Components/MessageInput.js'

const myMessages = ["test"];
let socket;


function App() {

const [messages, setMessages] = useState(myMessages);
const [currMessage, setCurrMessage] = useState("")
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
  
  return (
    <div>
      <form onSubmit={submitMessageHandler}>
        <input type="text" onChange={textChangeHandler} value={currMessage}></input>
        <button type="submit">send</button>

      </form>
      <button onClick={connect}>connect</button>
      {messages.map((message, index) => {
        return (<p key={index}>{message}</p>)})}
    </div>
  )
}

export default App;
