import jwt from 'jsonwebtoken'

export const createToken = async (userData: any) => {
    return jwt.sign(userData, process.env.PRIVATE_KEY, {
        algorithm: 'HS256',
        expiresIn: '1h',
    })
}

export const jwtAuthMiddleware = (req, res, next) => {

    const authorization = req.headers.authorization
    if (!authorization) return res.status(401).json({ error: 'Token Not Found' });
    
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({ error: "invalid token" });
    }
}
