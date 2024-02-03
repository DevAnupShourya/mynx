import { ExtendedError } from "node_modules/socket.io/dist/namespace";
import jwt, { JwtPayload } from 'jsonwebtoken';

import { JWT_SECRET } from '~/v1/config/Variables';
import User from '~/v1/models/User.model';

async function socketMiddleware(token: any, next: (err?: ExtendedError | undefined) => void) {
    // If no token found
    if (token === undefined || token === null) {
        console.error('Unauthorized Connection: No Token Found!')
        next(new Error('Unauthorized Connection: No Token Found!'))
    } else {
        try {
            const { id } = jwt.verify(token, JWT_SECRET) as JwtPayload;
            // If token is not valid
            if (!id) {
                console.error('Unauthorized Connection: User Unauthorized!')
                next(new Error('Unauthorized Connection: User Unauthorized!'))
            } else {
                const userFromDB = await User.findById(id);
                // If no user found with token
                if (userFromDB) {
                    next(); // Continue with the connection
                } else {
                    console.error('Unauthorized Connection: No User Found!')
                    next(new Error('Unauthorized Connection: No User Found!'))
                }
            }
        } catch (error: any) {
            console.error(error.message)
            next(new Error(error.message))
        }
    }
}

export default socketMiddleware