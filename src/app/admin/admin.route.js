import express from "express";

import { verifyRole,verifyToken } from "../../middleware/index.js";
import { adminController } from "./admin.controller.js";

const router = express.Router();

router.get("/users", verifyToken, verifyRole("ADMIN"), adminController.getAllUsers);

router.get("/vendors", verifyToken, verifyRole("ADMIN"), adminController.getAllVendor);

router.get("/certificates", verifyToken, verifyRole("ADMIN"), adminController.getAllCertificateApply);


router.patch(
  "/certificates/approve/:vendorId",
  verifyToken,
  verifyRole("ADMIN"),
  adminController.approveCertificateApply
);

router.patch(
  "/certificates/reject/:vendorId",
  verifyToken,
  verifyRole("ADMIN"),
  adminController.rejectCertificateApply
);


router.get('/orders' ,verifyToken, verifyRole("ADMIN"), adminController.getOrders)


export const adminRouter= router;



