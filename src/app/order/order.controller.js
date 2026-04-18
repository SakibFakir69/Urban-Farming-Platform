


export const getOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const orders = await prisma.order.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,     
        product: true,  
      },
    });

    const total = await prisma.order.count();

    res.json({
      success: true,
      data: orders,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

 const createOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

   
    const product = await prisma.produce.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

  
    if (product.availableQuantity < quantity) {
      return res.status(400).json({
        success: false,
        message: "Not enough stock"
      });
    }

    
    const totalPrice = product.price * quantity;

   
    const order = await prisma.order.create({
      data: {
        userId,
        productId,
        quantity,
        totalPrice
      }
    });

    
    await prisma.produce.update({
      where: { id: productId },
      data: {
        availableQuantity: product.availableQuantity - quantity
      }
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order
    });

  } catch (error) {
    next(error);
  }
};

export const orderController ={
    getOrders,createOrder
}
