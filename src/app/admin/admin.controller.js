import prisma from "../../../lib/prisma";
import { sendResponse } from "../../utils/return-response";

/* =========================
   GET ALL USERS
========================= */
const getAllUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" }
    });

    return sendResponse(res, 200, true, "Users fetched", users);
  } catch (error) {
    next(error);
  }
};

/* =========================
   GET ALL VENDORS
========================= */
const getAllVendor = async (req, res, next) => {
  try {
    const vendors = await prisma.vendorProfile.findMany({
      include: {
        user: true,
        sustainabilityCert: true
      }
    });

    return sendResponse(res, 200, true, "Vendors fetched", vendors);
  } catch (error) {
    next(error);
  }
};

/* =========================
   GET ALL CERTIFICATE REQUESTS
========================= */
const getAllCertificateApply = async (req, res, next) => {
  try {
    const certs = await prisma.sustainabilityCert.findMany({
      include: {
        vendor: true
      },
      orderBy: {
        certificationDate: "desc"
      }
    });

    return sendResponse(res, 200, true, "Certificates fetched", certs);
  } catch (error) {
    next(error);
  }
};

/* =========================
   APPROVE CERTIFICATE
========================= */
const approveCertificateApply = async (req, res, next) => {
  try {
    const vendorId = Number(req.params.vendorId);

    const cert = await prisma.sustainabilityCert.update({
      where: { vendorId },
      data: { status: "APPROVED" }
    });

    await prisma.vendorProfile.update({
      where: { userId: vendorId },
      data: { certificationStatus: true }
    });

    return sendResponse(res, 200, true, "Certificate approved", cert);
  } catch (error) {
    next(error);
  }
};

/* =========================
   REJECT CERTIFICATE
========================= */
const rejectCertificateApply = async (req, res, next) => {
  try {
    const vendorId = Number(req.params.vendorId);

    const cert = await prisma.sustainabilityCert.update({
      where: { vendorId },
      data: { status: "REJECTED" }
    });

    return sendResponse(res, 200, true, "Certificate rejected", cert);
  } catch (error) {
    next(error);
  }
};

// all rental 
// rental , delete

export const adminController = {
  getAllUsers,
  getAllVendor,
  getAllCertificateApply,
  approveCertificateApply,
  rejectCertificateApply
};