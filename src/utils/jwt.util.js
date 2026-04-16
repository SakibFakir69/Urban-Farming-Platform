import Jwt from "jsonwebtoken";


export const generateToken = (data, time)=>{
    const {email,id,role,name} = data;
    const payload = {
        email,id,role
    }

    const token = Jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn:time
    })
    return token;
}









