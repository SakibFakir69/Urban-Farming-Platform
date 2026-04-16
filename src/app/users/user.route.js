import { Router } from "express";
import { userController } from "./user.controller.js";

const router = Router();


router.post('/create', userController.createUser);
router.post('/login', userController.loginUser);

export const userRouter = router;