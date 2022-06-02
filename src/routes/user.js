const express = require("express");
const { validationResult } = require("express-validator");
const prisma = require("../client/prisma");
const { ValidateSignUp } = require("../client");

const routes = express.Router();

routes.post("/", ValidateSignUp, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ error: errors.array() });
    
    const user = await prisma.user.create({ data: req.body });
    return res.json({ data: user });
});

routes.get("/:id/orders", async (req, res) => {
    const users = await prisma.user.findMany({
        select:
        {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            age: true,
            order: true
        }
    });

    if (!users.id)
        return res.status(400).json({ data: null, error: "Invalid ID" });

    return res.json({ data: users.order });
});

module.exports = routes;