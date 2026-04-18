import { Router } from "express";
import { userController } from "./user.controller.js";
import { loginLimiter, registerLimiter } from "../../middleware/rateLimiter.js";

const router = Router();


router.post('/register',registerLimiter, userController.createUser);
router.post('/login',loginLimiter, userController.loginUser);

export const userRouter = router;