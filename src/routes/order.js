const express = require("express");
const { prisma } = require("../client");

const router = express.Router();

router.post("/", async (req, res) => {
    const product = await prisma.Product.create({
        data:
        {
            userId: req.body.order.userId,
            itemId: req.body.order.product.id,
        },
    });
    return res.json({ data: product });
});