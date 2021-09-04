import React , {useState, useEffect} from 'react'

const myMessages = ["test"];
let socket;

const Main = (props) => {

    const [currMessage, setCurrMessage] = useState("");
    const [messages, setMessages] = useState(myMessages);

    useEffect(() => {
        socket = new WebSocket('ws://localhost:8080');
        socket.addEventListener('open', function(ev) {
            socket.send("hello server!")
        });

        socket.addEventListener('message', function(ev) {
            setMessages(prevState => {
                return [ev.data, ...prevState];
            });
        });
    }, [])

    const textChangeHandler = (ev) => {
        setCurrMessage(ev.target.value);
    }

    const submitMessageHandler = (ev) => {
        ev.preventDefault();
        socket.send(currMessage);
        setCurrMessage("");
    }


    return (
        <div>
            <form onSubmit={submitMessageHandler}>
                <input type="text" onChange={textChangeHandler} value={currMessage}></input>
                <button type="submit">send</button>
            </form>
            {/* <button onClick={connect}>connect</button> */}
            {messages.map((message, index) => {
                return (<p key={index}>{message}</p>)})}

            <button onClick={props.onLogout}>log out</button>
        </div>

    )
}

export default Main;