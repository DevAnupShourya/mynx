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

app.use(express.json());
app.use(cors());


// ? Database Connection
import DatabaseConnection from '~/config/Database';
DatabaseConnection();

// ? Routes
app.get('/', (_, res: Response) => {
    res.status(200).send({
        status: 200,
        message: 'Welcome to Vixel API',
        documentation: 'https://api.vixel.com/docs'
    });
});
app.get('/api', (_, res: Response) => {
    res.status(200).send({
        status: 200,
        message: 'Welcome to Vixel API',
        documentation: 'https://api.vixel.com/docs'
    });
});

import userRoute from '~/routes/Users';
app.use('/api/users/', userRoute);

// ? For Posts Services
import postRoute from '~/routes/Posts';
app.use('/api/posts/', postRoute);

app.get('*', (_, res: Response) => {
    res.status(200).send({
        status: 404,
        message: 'Resource Not Found',
        documentation: 'https://api.vixel.com/docs'
    });
});


// TODO : for HTTPS
// import fs from 'fs';
// "dev": "HTTPS=true SSL_CRT_FILE={A:/Projects/Vixel/code/client/localhost.crt}.pem SSL_KEY_FILE={A:/Projects/Vixel/code/client/localhost.key}.pem concurrently \"vite\" \"npx tailwindcss -i ./src/styles/tailwind.css -o ./src/styles/output.css --watch\"",
// "dev": "set HTTPS=true && set SSL_CRT_FILE=A:/Projects/Vixel/code/client/localhost.crt && set SSL_KEY_FILE=A:/Projects/Vixel/code/client/localhost.key && concurrently \"vite --https\" \"npx tailwindcss -i ./src/styles/tailwind.css -o ./src/styles/output.css --watch\"",
// const serverOptions = {
//     key: fs.readFileSync('A:/Projects/Vixel/code/api/localhost.key'),
//     cert: fs.readFileSync('A:/Projects/Vixel/code/api/localhost.crt'),
// };

import { API_PORT } from '~/config/Variables';
app.listen(API_PORT, () => {
    console.log(`⚡️ API Listening on : http://127.0.0.1:${API_PORT} ⚡️`);
});
