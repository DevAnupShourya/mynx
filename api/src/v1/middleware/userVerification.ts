import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { JWT_SECRET } from '~/v1/config/Variables';
import User from '~/v1/models/User.model';

import { responseError, responseWarn } from '~/v1/utils/apiResponseMsg';

// ? Custom interface that extends the Request type with userId
interface AuthenticatedRequest extends Request {
    userId?: String;
}

const userVerification = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    try {
        // ? If not token found
        if (token === undefined || token === null) {
            responseError(res, 404, "No Token Found!!!", null);
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
    } catch (error : any) {
        responseError(res, 403, `Error : ${error}`, null);
    }
}

export default userVerification;