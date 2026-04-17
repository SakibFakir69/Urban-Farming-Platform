import prisma from "../../../lib/prisma.js";
import { sendResponse } from "../../utils/return-response.js";

const createVendor = async (req, res, next) => {
  try {
    if (req.user.role !== "vendor") {
      return sendResponse(res, 403, false, "Access denied");
    }

    const userId = req.user.id;

    const existing = await prisma.vendorProfile.findUnique({
      where: { userId }
    });

    if (existing) {
      return sendResponse(res, 400, false, "Vendor already exists");
    }

    const vendor = await prisma.vendorProfile.create({
      data: {
        ...req.body,
        userId
      }
    });

    return sendResponse(
      res,
      201,
      true,
      "Vendor created successfully",
      vendor
    );
  } catch (error) {
    next(error);
  }
};

const updateVendor = async (req, res, next) => {
  try {
    if (req.user.role !== "vendor") {
      return sendResponse(res, 403, false, "Access denied");
    }

    const userId = req.user.id;

    const vendor = await prisma.vendorProfile.findUnique({
      where: { userId }
    });

    if (!vendor) {
      return sendResponse(res, 404, false, "Vendor not found");
    }

    const updated = await prisma.vendorProfile.update({
      where: { userId },
      data: {
        farmName: req.body.farmName,
        farmLocation: req.body.farmLocation
      }
    });

    return sendResponse(
      res,
      200,
      true,
      "Vendor updated successfully",
      updated
    );
  } catch (error) {
    next(error);
  }
};


const deleteVendor = async (req, res, next) => {
  try {
    if (req.user.role !== "vendor") {
      return sendResponse(res, 403, false, "Access denied");
    }

    const userId = req.user.id;

    const vendor = await prisma.vendorProfile.findUnique({
      where: { userId }
    });

    if (!vendor) {
      return sendResponse(res, 404, false, "Vendor not found");
    }

    await prisma.vendorProfile.delete({
      where: { userId }
    });

    return sendResponse(res, 200, true, "Vendor deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const vendorController = {
  createVendor,
  updateVendor,
  deleteVendor
};