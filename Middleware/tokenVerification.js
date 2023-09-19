import jwt from 'jsonwebtoken';

export const verifyToken = (req,res,next) => {

    const cookie = req.headers.cookie;
    const token =cookie?.split("=")[1];

    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }

    jwt.verify(token,process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token expired or invalid' });
        }
        req.user = decoded;
        next();
    });
}