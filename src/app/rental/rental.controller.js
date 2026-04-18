import prisma from "../../../lib/prisma.js";
import { sendResponse } from "../../utils/return-response.js";



const createRentalPlot = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const { location, size, price } = req.body;

    if (!location || !size || !price) {
      return sendResponse(res, 400, false, "All fields are required");
    }

   
    const vendor = await prisma.vendorProfile.findUnique({
      where: { userId }
    });

    if (!vendor) {
      return sendResponse(res, 404, false, "Vendor profile not found");
    }

    const rental = await prisma.rentalSpace.create({
      data: {
        vendorId: vendor.id,
        location,
        size,
        price,
        availability: true
      }
    });

    return sendResponse(res, 201, true, "Rental space created", rental);

  } catch (error) {
    next(error);
  }
};



const getAllRentalPlot = async (req, res, next) => {
  try {
    const { location } = req.query;

    const rentals = await prisma.rentalSpace.findMany({
      where: location
        ? {
            location: {
              contains: location,
              mode: "insensitive"
            }
          }
        : {},
      include: {
        vendor: true
      }
    });

    return sendResponse(res, 200, true, "All rental plots", rentals);

  } catch (error) {
    next(error);
  }
};



const getSingleRentalPlot = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const rental = await prisma.rentalSpace.findUnique({
      where: { id },
      include: { vendor: true }
    });

    if (!rental) {
      return sendResponse(res, 404, false, "Rental not found");
    }

    return sendResponse(res, 200, true, "Rental found", rental);

  } catch (error) {
    next(error);
  }
};

const updateRentalPlot = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const rentalId = Number(req.params.id);

    const rental = await prisma.rentalSpace.findUnique({
      where: { id: rentalId }
    });

    if (!rental) {
      return sendResponse(res, 404, false, "Rental not found");
    }

   
    const vendor = await prisma.vendorProfile.findUnique({
      where: { userId }
    });

    if (!vendor || rental.vendorId !== vendor.id) {
      return sendResponse(res, 403, false, "Access denied");
    }

    const updated = await prisma.rentalSpace.update({
      where: { id: rentalId },
      data: req.body
    });

    return sendResponse(res, 200, true, "Rental updated", updated);

  } catch (error) {
    next(error);
  }
};


const deleteRentalPlot = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const rentalId = Number(req.params.id);

    const rental = await prisma.rentalSpace.findUnique({
      where: { id: rentalId }
    });

    if (!rental) {
      return sendResponse(res, 404, false, "Rental not found");
    }

    const vendor = await prisma.vendorProfile.findUnique({
      where: { userId }
    });

    if (!vendor || rental.vendorId !== vendor.id) {
      return sendResponse(res, 403, false, "Access denied");
    }

    await prisma.rentalSpace.delete({
      where: { id: rentalId }
    });

    return sendResponse(res, 200, true, "Rental deleted");

  } catch (error) {
    next(error);
  }
};

export const rentalController = {
  createRentalPlot,
  getAllRentalPlot,
  getSingleRentalPlot,
  updateRentalPlot,
  deleteRentalPlot
};