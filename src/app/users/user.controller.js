import { send } from "node:process";
import prisma from "../../../lib/prisma.js";
import { sendResponse } from "../../utils/return-response.js";
import bcrypt from 'bcrypt';
import { generateToken } from "../../utils/jwt.util.js";



const createUser = async (req, res) => {
    try {
        const userData = req.body;
        console.log("create user hit");

        const isUserExit = await prisma.user.findFirst({
            where: {
                email: userData?.email
            }
        })

        if (isUserExit) {
            return sendResponse(res, 400, false, 'Already User Have This Email')
        }
        userData.password = await bcrypt.hash(userData.password, 10);

        const result = await prisma.user.create({
            data: userData
        });

        return sendResponse(res, 201, true, 'User Created Successfully', result);
    } catch (error) {
        console.error("Database Error:", error);
        return res.status(500).json({ success: false, message: "Internal Error" });
    }
}

const loginUser = async (req, res) => {


    try {

        const { email, password } = req.body;

        if (!email || !password) {

            return sendResponse(res, 400, false, "Email and password required");
        }

        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if (!user) {
            return sendResponse(res, 404, false, "User not found");
        }
        const isMatchPassword = await bcrypt.compare(password, user.password);
        if (!isMatchPassword) {
            return sendResponse(res, 401, false, "Invalid credentials");
        }

        const accessToken = generateToken(
            {
                email: user.email,
                id: user.id,
                role: user.role
            },
            "1d"
        );
        const refreshToken = generateToken(
            {
                email: user.email,
                id: user._id,
                role: user.role
            },
            "1d"
        );
        return sendResponse(res, 200, true, "Login successful", {
            accessToken,
            refreshToken
        });








    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Error" , stack:error?.stack });

    }

}


export const userController = {
    createUser, loginUser
}