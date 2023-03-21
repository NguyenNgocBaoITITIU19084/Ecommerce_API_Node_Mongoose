require("dotenv").config();

const express = require("express");

const catchError = require("./middlewares/catchErrors");
const authRouter = require("./routes/authRouters");
const categoryRouter = require("./routes/categoryRouter");
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");
const { rateLimit } = require("./middlewares/rateLimit");
const EmailService = require("./utils/EmailService");

const ConnectDB = require("./config/db");
const PORT = process.env.PORT;

EmailService.init();

const app = express();

app.use(express.json());

ConnectDB();

app.use("/auth", authRouter);
app.use("/category", categoryRouter);
app.use("/product", productRouter);
app.use("/user", userRouter);

app.use(catchError);

app.listen(PORT, (req, res) => {
  console.log(`server is runnning on ${PORT}`);
});
