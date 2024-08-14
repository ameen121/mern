const { z } = require("zod");

const signupSchema = z.object({
    username: z.
        string({ required_error: "Name is require" })
        .trim()
        .min(3, { message: "Name must be atleast 3 character" })
        .max(255, { message: "Name must not be greater then 255 character" }),
    email: z.
        string({ required_error: "Email is require" })
        .trim()
        .email({ message: "Invalid Email address" })
        .min(3, { message: "Email must be atleast 3 character" })
        .max(255, { message: "Email must not be greater then 255 character" }),
    phone: z.
        string({ required_error: "Phone is require" })
        .trim()
        .min(10, { message: "Phone must be atleast 10 character" })
        .max(20, { message: "Phone must not be greater then 20 character" }),
    password: z.
        string({ required_error: "Password is require" })
        .min(7, { message: "Password must be atleast 7 character" })
        .max(1024, { message: "Password must not be greater then 1024 character" }),
});

const loginSchema = z.object({

    email: z.
        string({ required_error: "Email is require" })
        .trim()
        .email({ message: "Invalid Email address" })
        .min(3, { message: "Email must be atleast 3 character" })
        .max(255, { message: "Email must not be greater then 255 character" }),
    password: z.
        string({ required_error: "Password is require" })
});
module.exports = {signupSchema, loginSchema};