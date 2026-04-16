import { send } from "node:process";
import prisma from "../../../lib/prisma.js";
import { sendResponse } from "../../utils/return-response.js";

const createUser = async (req, res) => {
    try {
        const userData = req.body;
        console.log("create user hit");


        const isUserExit = await prisma.user.findFirst({
            where:{
                email:userData?.email
            }
        })
        
        if(isUserExit)
        {
            return sendResponse(res, 400, false, 'Already User Have This Email')
        }

        const result = await prisma.user.create({
            data: userData
        });

        return sendResponse(res, 201, true, 'User Created Successfully', result);
    } catch (error) {
        console.error("Database Error:", error);
        return res.status(500).json({ success: false, message: "Internal Error" });
    }
}

export const userController = {
    createUser
}