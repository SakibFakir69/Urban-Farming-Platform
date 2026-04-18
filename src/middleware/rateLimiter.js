
import express from "express";
import {rateLimit} from 'express-rate-limit'



export const loginLimiter = rateLimit({
    windowMs:15*60*1000,
    max:10,
    message:{
        success:false,
        message:"Too many login attempts. Try again later"
    },
    standardHeaders:true,
    legacyHeaders:false
})
export const registerLimiter = rateLimit({
    windowMs:60*60*1000,
    max:10,
    message:{
        success:false,
           message: "Too many accounts created. Try again later."
    }
})