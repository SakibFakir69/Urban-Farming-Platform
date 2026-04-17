
import jwt from 'jsonwebtoken';


export const verifyToken = async (req, res, next) => {

    const token = req.header('Authorization')?.split(' ')[1];
    console.log(token);

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


export const verifyRole = (...roles) => {

    return (req, res, next) => {

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }
       
        if (!roles.includes(req.user.role)) {

            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }
        
        next();

    }

}