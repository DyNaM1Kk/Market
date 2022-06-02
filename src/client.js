const { PrismaClient } = require("@prisma/client");
const { checkSchema } = require("express-validator");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
    if (params.action === "create" && params.model === "User")
    {
        const user = params.args.data;
        const password = bcrypt.hashSync(user.password, 10);

        user.password = password;
        params.args.data = user;
    }

    return next(params);
});

const ValidateSignUp = checkSchema({
    username:
    {
        in: ["body"],
        isString: true,
        isEmpty: false,
        isLength:
        {
            options:
            {
                min: 8,
                max: 24,
            },
        },
    },
    firstName:
    {
        in: ["body"],
        isString: true,
        isEmpty: false,
        isLength:
        {
            options:
            {
                min: 2,
                max: 24,
            },
        },
    },
    lastName:
    {
        in: ["body"],
        isString: true,
        isEmpty: false,
        isLength:
        {
            options:
            {
                min: 2,
                max: 32,
            },
        },
    },
    password:
    {
        in: ["body"],
        isEmpty: false,
        isLength:
        {
            options:
            {
                min: 8,
                max: 64,
            },
        },
    },
});

module.exports = { ValidateSignUp, prisma };