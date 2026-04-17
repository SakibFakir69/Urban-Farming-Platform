import express from "express";
import verifyToken from "../../middleware/verifyToken.js";
import { verifyRole } from "../../middleware/verifyRole.js";
import { adminController } from "./admin.controller.js";

const router = express.Router();

router.get("/users", verifyToken, verifyRole("admin"), adminController.getAllUsers);

router.get("/vendors", verifyToken, verifyRole("admin"), adminController.getAllVendor);

router.get("/certificates", verifyToken, verifyRole("admin"), adminController.getAllCertificateApply);

router.patch(
  "/certificates/approve/:vendorId",
  verifyToken,
  verifyRole("admin"),
  adminController.approveCertificateApply
);

router.patch(
  "/certificates/reject/:vendorId",
  verifyToken,
  verifyRole("admin"),
  adminController.rejectCertificateApply
);

export default router;



