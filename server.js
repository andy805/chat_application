/*
 * Andy Velazquez 
 */


import { createServer } from "http";
import { readFileSync } from "fs";
import {WebSocketServer} from "ws";
import express from "express";


const app = express();
const port = 3000;

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

app.listen( port, () => {
    console.log(`server started on port ${port}}`);
});


