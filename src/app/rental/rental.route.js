


import express from "express";
import  {verifyToken , verifyRole} from "../../middleware/index.js";
import { rentalController } from "./rental.controller.js";
const router = express.Router();



router.post(
  "/",
  verifyToken,
  verifyRole("VENDOR"),
  rentalController.createRentalPlot
);

router.get("/", rentalController.getAllRentalPlot);
router.get("/:id", rentalController.getSingleRentalPlot);

router.patch(
  "/rentals/:id",
  verifyToken,
  verifyRole("VENDOR"),
  rentalController.updateRentalPlot
);

router.delete(
  "/rentals/:id",
  verifyToken,
  verifyRole("VENDOR"),
  rentalController.deleteRentalPlot
);




export const rentalRouter = router;






