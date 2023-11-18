import { Response } from 'express';

const responseError = (res: Response, code: number, msg: String, data: object | null): Response => {
    return res.status(code).send({
        "status": "Error",
        "message": msg,
        "data": data || null
    }) as Response;
}
const responseWarn = (res: Response, code: number, msg: String, data: object | null): Response => {
    return res.status(code).send({
        "status": "Warning",
        "message": msg,
        "responseData": data || null
    }) as Response;
}
const responseInfo = (res: Response, code: number, msg: String, data: object | null): Response => {
    return res.status(code).send({
        "status": "Success",
        "message": msg,
        "responseData": data || null
    }) as Response;
}
export { responseError, responseInfo, responseWarn };