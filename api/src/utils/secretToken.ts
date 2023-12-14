import jwt from 'jsonwebtoken';
// ? Importing JWT TOken From config
import { JWT_SECRET } from '~/config/Variables';

const createSecretToken = (id: string) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '28 days' });
}

export default createSecretToken;