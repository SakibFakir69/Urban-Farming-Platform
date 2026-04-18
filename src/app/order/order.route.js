import { Router } from "express";
import { verifyRole, verifyToken } from "../../middleware/index.js";
import { orderController } from "./order.controller.js";



const router = Router();

router.get('/',verifyToken, verifyRole("CUSTOMER"), orderController.getOrders);

router.post(
    "/",
    verifyToken,
    verifyRole("CUSTOMER"),
    orderController.createOrder
);

export const orderRouter = router;