import jwt from 'jsonwebtoken';

export const AuthUserToken = async (req, res, next) => {
    const token = req.cookies.token;
    try {
        if (!token) {
            return res.status(401).json({ success: false, message: 'Token not found' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(403).json({ success: false, message: 'Token is not valid' });
        }

        req.userID = decoded.userID;
        next()
    } catch (error) {
        console.error(error, "something went wrong")
        return res.status(500).json({ success: false, message: "Something went wrong"})
    }
}