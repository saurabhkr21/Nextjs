//@ts-nocheck
import jwt from 'jsonwebtoken';

export const createToken = (data) => {

    const token=jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    return token;
}
export const verifyToken=(token:string)=>{
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (err) {
        return null;
    }
}