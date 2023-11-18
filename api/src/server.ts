// ? Packages
import express, { Response } from "express";
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';

// ? Declarations
const app = express();
dotenv.config();
app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:5173',
};

app.use(cors(corsOptions));

// ? Middleware function
app.use(helmet.xssFilter());

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

import userRoute from '~/microservices/user-service/routes/Users';
app.use('/api/users', userRoute);

app.get('*', (_, res: Response) => {
    res.status(200).send({
        status: 404,
        message: 'Resource Not Found',
        documentation: 'https://api.vixel.com/docs'
    });
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`⚡️ API Listening on : http://127.0.0.1:${port} ⚡️`);
});
