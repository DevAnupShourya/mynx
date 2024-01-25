import dotenv from 'dotenv';
dotenv.config();

import { Secret } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as Secret;
const API_PORT_NO = process.env.API_PORT_NO as string;

export { JWT_SECRET, API_PORT_NO };