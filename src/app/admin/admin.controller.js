import prisma from "../../../lib/prisma.js";
import { sendResponse } from "../../utils/return-response.js";
import { getOrders } from "../order/order.controller.js";


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


const allOrders = async (req, res, next) => {
  try {
    const userRole = req.user.role;

  
    if (userRole !== "ADMIN") {
      return sendResponse(res, 403, false, "Access denied");
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const orders = await prisma.order.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc"
      },
      include: {
        user: true,
        product: true
      }
    });

    const total = await prisma.order.count();

    return sendResponse(res, 200, true, "All orders fetched successfully", {
      orders,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    next(error);
  }
};


export const adminController = {
  getAllUsers,
  getOrders,

  getAllVendor,
  getAllCertificateApply,
  approveCertificateApply,
  rejectCertificateApply
};