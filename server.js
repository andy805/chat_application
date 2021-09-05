/*
 * Andy Velazquez 
 */


import { createServer } from "http";
import { readFileSync } from "fs";
import {WebSocketServer} from "ws";
import express from "express";
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
const port = 3000;
const users = [{username: "andy",
              password: "1234"},
            {username: "test",
          password: "abcd"}];

//const server = http.createServer(app);

const wss = new WebSocketServer({port: 8080});


wss.on('connection', function connection(ws, req) {
    console.log(ws);
    // console.log("\n\n\n");
    // console.log(req);
    ws.on('message', function incoming(message){
        console.log('receive: %s', message);
        ws.send(`Hello client, you sent -> ${message}`);
    });

    ws.send('i am a websocket server');
});

app.get("/" , (req, res) => {

})

app.post("/" , (req, res) => {
    console.log(req);
    let user = req.body;
    console.log(user);
    for(let i = 0; i < users.length; i++) {
        if(user.username === users[i].username && user.password === users[i].password) {
            const validUser = { isValidUser: "1"};
            res.json(validUser);
            return;
        }
    }
    res.status(500).json({error: "not valid"});
})

app.listen( port, () => {
    console.log(`server started on port ${port}}`);
});


