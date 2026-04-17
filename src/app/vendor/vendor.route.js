
import { vendorController } from "./vendor.controller.js";
import { verifyRole } from "../../middleware/index.js";
import { Router } from "express";
import { verifyToken } from "../../middleware/index.js";



const router = Router();

router.post(
  "/vendor",
  verifyToken,
  verifyRole("vendor"),
  vendorController.createVendor
);

router.patch(
  "/vendor",
  verifyToken,
  verifyRole("vendor"),
  vendorController.updateVendor
);

router.delete(
  "/vendor",
  verifyToken,
  verifyRole("vendor"),
  vendorController.deleteVendor
);

export const vendorRouter = router;