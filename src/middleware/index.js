
import jwt from 'jsonwebtoken';


const verifyToken = async (req, res, next) => {

    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Invalid Token"
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(401).json({
            success: false,
            message: "Invalid Token"

        })
        req.user = user;
        next();
    })


}


const verifyRole = (role) => {

    return (req, res, next) => {
        
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        if (req.user?.role !== role) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }
        next();

    }



}