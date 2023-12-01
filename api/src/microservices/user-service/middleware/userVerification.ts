import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// ? Importing JWT TOken From config
import { JWT_SECRET } from '~/microservices/user-service/config/Variables';
import User from '~/microservices/user-service/models/User.model';

import { responseError, responseWarn } from '~/microservices/user-service/utils/apiResponseMsg';

// ? Custom interface that extends the Request type with User
interface AuthenticatedRequest extends Request {
    userId?: String;
}

const userVerification = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    // ? If not token found
    if (token === undefined || token === null) {
        responseError(res, 404, "No Entry!!!", null);
    } else {
        const { id } = jwt.verify(token, JWT_SECRET) as JwtPayload;
        // ? If token is not valid
        if (!id) {
            responseError(res, 403, "User Unauthorized!!", null);
        } else {
            const userFromDB = await User.findById(id);
            // ? If no User found with token
            if (userFromDB) {
                req.userId = userFromDB._id.toString()
                next();
            } else {
                return responseWarn(res, 403, "No User Found!", null);
            }
        }
    }
}

export default userVerification;