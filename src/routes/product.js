const express = require("express");
const { prisma } = require("../client");

const router = express.Router();

router.get("/", async (req, res) => {
    const products = await prisma.Product.findMany({
        select:
        {
            name: true,
            price: true,
            amount: true,
            order: true
        }
    });
    return res.json({ data: products });
});

router.get("/:id", async (req, res) => {
    const product = await prisma.Product.findUnique({ where: { id: req.body.id } });
    return res.json({ data: product });
});

router.post("/", async (req, res) => {
    const product = await prisma.Product.create({
        data:
        {
            name: req.body.name,
            price: req.body.price,
            amount: req.body.amount
        },
    });

    if (product.amount == 0)
        return res.status(400).json({ data: null, error: "Out of stock" });

    return res.json({ data: post });
});

module.exports = router;