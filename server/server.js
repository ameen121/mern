require("dotenv").config();
const express         = require("express");
const app             = express();
const cors = require("cors");
const authRoute       = require("./router/auth-router");
const connectDb       = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const contactRoute    = require("./router/contact-router");
const serviceRoute    = require("./router/service-route");
const AdminRoute      = require("./router/admin-route");

// lets tackle our middleware
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE,HEAD",
    credentials: true,
}
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/form",contactRoute);
app.use("/api/data",serviceRoute);
app.use("/api/admin",AdminRoute);
app.use(errorMiddleware);

connectDb().then(() => {
    const PORT = 8000;
    app.listen(PORT, () => {
        console.log(`Server Is Running at: ${PORT}`);
    })
});