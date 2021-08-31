import logo from './logo.svg';
import './App.css';
import {useState} from 'react';


const myMessages = ["test"];


function App() {

const [messages, setMessages] = useState(myMessages);
const connect = () => {
  const socket = new WebSocket('ws://localhost:8080');
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
  
  return (
    <div>
      <button onClick={connect}>connect</button>
      {messages.map((message, index) => {
        return (<p key={index}>{message}</p>)})}
    </div>
  )
}

export default App;
