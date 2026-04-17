


import prisma from "../../../lib/prisma.js";
import { sendResponse } from "../../utils/return-response.js";


const createProduce = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const vendor = await prisma.vendorProfile.findUnique({
      where: { userId }
    });

    if (!vendor) {
      return sendResponse(res, 404, false, "Vendor not found");
    }

    const { name, description, price, category, availableQuantity } = req.body;

    if (!name || !price || !category || !availableQuantity) {
      return sendResponse(res, 400, false, "Missing required fields");
    }

    const produce = await prisma.produce.create({
      data: {
        vendorId: vendor.id,
        name,
        description,
        price,
        category,
        availableQuantity,
        certificationStatus: vendor.certificationStatus
      }
    });

    return sendResponse(res, 201, true, "Produce created successfully", produce);

  } catch (error) {
    next(error);
  }
};



const getAllProduce = async (req, res, next) => {
  try {
    const { category, search } = req.query;

    const products = await prisma.produce.findMany({
      where: {
        ...(category && { category }),
        ...(search && {
          name: {
            contains: search,
            mode: "insensitive"
          }
        })
      },
      include: {
        vendor: true
      },
      orderBy: {
        id: "desc"
      }
    });

    return sendResponse(res, 200, true, "Products fetched", products);

  } catch (error) {
    next(error);
  }
};



const getSingleProduce = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const product = await prisma.produce.findUnique({
      where: { id },
      include: {
        vendor: true
      }
    });

    if (!product) {
      return sendResponse(res, 404, false, "Product not found");
    }

    return sendResponse(res, 200, true, "Product found", product);

  } catch (error) {
    next(error);
  }
};



const updateProduce = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const productId = Number(req.params.id);

    const vendor = await prisma.vendorProfile.findUnique({
      where: { userId }
    });

    if (!vendor) {
      return sendResponse(res, 404, false, "Vendor not found");
    }

    const product = await prisma.produce.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return sendResponse(res, 404, false, "Product not found");
    }

    if (product.vendorId !== vendor.id) {
      return sendResponse(res, 403, false, "Access denied");
    }

    const updated = await prisma.produce.update({
      where: { id: productId },
      data: req.body
    });

    return sendResponse(res, 200, true, "Product updated", updated);

  } catch (error) {
    next(error);
  }
};



const deleteProduce = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const productId = Number(req.params.id);

    const vendor = await prisma.vendorProfile.findUnique({
      where: { userId }
    });

    if (!vendor) {
      return sendResponse(res, 404, false, "Vendor not found");
    }

    const product = await prisma.produce.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return sendResponse(res, 404, false, "Product not found");
    }

    if (product.vendorId !== vendor.id) {
      return sendResponse(res, 403, false, "Access denied");
    }

    await prisma.produce.delete({
      where: { id: productId }
    });

    return sendResponse(res, 200, true, "Product deleted");

  } catch (error) {
    next(error);
  }
};

export const produceController = {
  createProduce,
  getAllProduce,
  getSingleProduce,
  updateProduce,
  deleteProduce
};














