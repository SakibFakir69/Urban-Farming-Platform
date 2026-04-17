
import { vendorController } from "./vendor.controller.js";
import { verifyRole } from "../../middleware/index.js";
import { Router } from "express";
import { verifyToken } from "../../middleware/index.js";



const router = Router();

router.post(
  "/vendor",
  verifyToken,
  verifyRole("VENDOR"),
  vendorController.createVendor
);

router.patch(
  "/vendor",
  verifyToken,
  verifyRole("VENDOR"),
  vendorController.updateVendor
);

router.delete(
  "/vendor",
  verifyToken,
  verifyRole("VENDOR"),
  vendorController.deleteVendor
);
router.get('/vendor', verifyToken, verifyRole("VENDOR", vendorController.getMyVendor))
router.post('/apply', verifyToken , verifyRole("VENDOR"), vendorController.applyCertificate);
export const vendorRouter = router;