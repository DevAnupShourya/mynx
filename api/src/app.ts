// ? Packages
import express, { Request, Response } from "express";
import morgan from 'morgan';
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
app.use(morgan('combined'));
app.use(helmet.xssFilter());

// ? Routes
app.get('/api', (req: Request, res: Response) => {
    res.status(200).send({
        status: 200,
        message: 'Welcome to Vixel API',
        documentation: 'https://api.vixel.com/docs'
    });
});
app.get('*', (req: Request, res: Response) => {
    res.status(200).send({
        status: 404,
        message: 'Resource Not Found',
        documentation: 'https://api.vixel.com/docs'
    });
});

import userRoute from '~/microservices/auth-service/routes/Users';
app.use('/api', userRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`API Listening on : http://127.0.0.1:${port} `);
});
