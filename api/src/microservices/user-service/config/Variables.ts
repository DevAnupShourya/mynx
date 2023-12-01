import { Secret } from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET as Secret;

const API_PORT = process.env.API_PORT as string;

export { JWT_SECRET, API_PORT };