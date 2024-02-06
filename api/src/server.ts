// ? Packages
import express, { Response, Application } from "express";
import helmet from 'helmet';
import cors from 'cors';
import { createServer } from "http";
import { Server, Socket } from "socket.io";

// ? Declarations
const app: Application = express();
const server = createServer(app);

import { FRONTEND_URL } from '~/v1/config/Variables';
const io = new Server(server, {
    pingTimeout: 10000,
    cors: {
        origin: `${FRONTEND_URL}`,
        methods: ["GET", "POST"],
        credentials: true,
    }
});

import socketMiddleware from "~/v1/utils/socketMiddleware";
import Socket_Events from "~/v1/types/Socket.io";

io.on(Socket_Events.SOCKET_CONNECT, (socket: Socket) => {
    // ? Protection Middleware
    io.use((socket, next) => {
        const token = socket.handshake.headers.authorization ? socket.handshake.headers.authorization.replace('Bearer ', '') : null;
        // ? Validate all incoming sockets
        socketMiddleware(token, next);
    });
    // console.log(`new connection : ${socket.id}`)
    socket.on(Socket_Events.USER_ONLINE, (chatRoomId: string) => {
        // console.log('User online in room : %s', chatRoomId);
        socket.in(chatRoomId).emit(Socket_Events.USER_ONLINE, chatRoomId)
    });
    socket.on(Socket_Events.USER_OFFLINE, (chatRoomId: string) => {
        // console.log('User offline in room : %s', chatRoomId);
        socket.in(chatRoomId).emit(Socket_Events.USER_OFFLINE, chatRoomId)
    });
    socket.on(Socket_Events.JOIN_CHAT, (chatRoomId: string) => {
        // console.log('User Joined room : %s', chatRoomId);
        socket.join(chatRoomId);
    });
    socket.on(Socket_Events.LEAVE_CHAT, (chatRoomId: string) => {
        // console.log('User Left room : %s', chatRoomId);
        socket.leave(chatRoomId);
    });
    socket.on(Socket_Events.MESSAGE_SEND, (data: { chatRoomId: string, messageId: string }) => {
        // console.log(`Received Messages ${data.chatRoomId}.`);
        socket.in(data.chatRoomId).emit(Socket_Events.MESSAGE_RECEIVE, data);
    });
    socket.on(Socket_Events.USER_TYPING_START, (chatRoomId: string) => {
        // console.log('User TYPING START in room : %s', chatRoomId);
        socket.in(chatRoomId).emit(Socket_Events.USER_TYPING_START, chatRoomId)
    });
    socket.on(Socket_Events.USER_TYPING_STOP, (chatRoomId: string) => {
        // console.log('User TYPING Stopped in room : %s', chatRoomId);
        socket.in(chatRoomId).emit(Socket_Events.USER_TYPING_STOP, chatRoomId)
    });
    socket.on(Socket_Events.SOCKET_DISCONNECT, (chatRoomId: string) => {
        // console.log(`User offline in ${chatRoomId}.`)
        socket.leave(chatRoomId);
        // console.log(`disconnected : ${socket.id}`);
    })
});


app.use(helmet.xssFilter());

app.use(express.json({ limit: '1mb' }));
app.use(cors());

// ? Database Connection
import DatabaseConnection from '~/v1/config/Database';
DatabaseConnection();

// ? Routes
app.get('/api', (_, res: Response) => {
    res.status(200).send({
        status: 200,
        message: 'Welcome to Mynx API',
        documentation: 'https://api.mynx.com/docs'
    });
});
app.get('/v1', (_, res: Response) => {
    res.status(200).send({
        status: 200,
        message: 'Welcome to Mynx API',
        documentation: 'https://api.mynx.com/docs'
    });
});

import userRoute from '~/v1/routes/Users.routes';
app.use('/v1/users/', userRoute);
import postRoute from '~/v1/routes/Posts.routes';
app.use('/v1/posts/', postRoute);
import chatsRoute from '~/v1/routes/Chats.routes';
app.use('/v1/chats/', chatsRoute);


app.get('*', (_, res: Response) => {
    res.status(404).send({
        status: 404,
        message: 'Route Not Found',
        documentation: 'https://api.mynx.com/docs'
    });
});

import { API_PORT_NO } from '~/v1/config/Variables';
server.listen(API_PORT_NO, () => {
    console.log(`⚡️ API Listening on : http://127.0.0.1:${API_PORT_NO} ⚡️`);
});
