import express from "express";
import { verifyRole, verifyToken } from "../../middleware/index.js";
import { produceController } from "./produce.controller.js";

const router = express.Router();


router.post(
  "/",
  verifyToken,verifyRole("VENDOR"),
  produceController.createProduce
);


router.get(
  "/",
  produceController.getProducts 
);

router.get(
  "/:id",

  verifyToken,verifyRole("VENDOR"),
  produceController.getSingleProduce
);


router.patch(
  "/:id",
  verifyToken,verifyRole("VENDOR"),
  produceController.updateProduce
);


router.delete(
  "/:id",
  verifyToken,
  verifyRole("VENDOR"),
  produceController.deleteProduce
);


export const produceRouter = router;