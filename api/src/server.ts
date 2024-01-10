// ? Packages
import express, { Response } from "express";
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';

// ? Declarations
const app = express();

// ? Middleware function
app.use(helmet.xssFilter());

dotenv.config();

app.use(express.json({limit : '10mb'}));
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

// ? For Posts Services
import postRoute from '~/v1/routes/Posts.routes';
app.use('/v1/posts/', postRoute);

app.get('*', (_, res: Response) => {
    res.status(200).send({
        status: 404,
        message: 'Route Not Found',
        documentation: 'https://api.Mynx.com/docs'
    });
});

import { API_PORT } from '~/v1/config/Variables';
app.listen(API_PORT, () => {
    console.log(`⚡️ API Listening on : http://127.0.0.1:${API_PORT} ⚡️`);
});
