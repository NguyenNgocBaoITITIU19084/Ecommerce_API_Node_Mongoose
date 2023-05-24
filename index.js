require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { rateLimit } = require("./middlewares/rateLimit");

const catchError = require("./middlewares/catchErrors");
const authRouter = require("./routes/authRouters");
const categoryRouter = require("./routes/categoryRouter");
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");
const brandRouter = require("./routes/brandRouter");
const discountRouter = require("./routes/discountRouter");
const uploadRouter = require("./routes/uploadRouter");
const EmailService = require("./utils/EmailService");

const Mongo = require("./config/db");
const PORT = process.env.PORT;

EmailService.init();
Mongo.connect();

const app = express();
app.use(cors());

app.use(express.json());

app.use("/auth", authRouter);
app.use("/category", categoryRouter);
app.use("/product", productRouter);
app.use("/user", userRouter);
app.use("/brand", brandRouter);
app.use("/discount", discountRouter);
app.use("/upload", uploadRouter);

app.use(catchError);

app.listen(PORT || 5000, (req, res) => {
  console.log(`Server is runnning on http://localhost:${PORT}`);
});
