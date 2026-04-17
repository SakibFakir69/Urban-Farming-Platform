


import express from "express";
import verifyToken from "../../middleware/verifyToken.js";
import { verifyRole } from "../../middleware.js";
import { rentalController } from "./rental.controller.js";

const router = express.Router();

router.post(
  "/rentals",
  verifyToken,
  verifyRole("VENDOR"),
  rentalController.createRentalPlot
);

router.get("/rentals", rentalController.getAllRentalPlot);
router.get("/rentals/:id", rentalController.getSingleRentalPlot);

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






