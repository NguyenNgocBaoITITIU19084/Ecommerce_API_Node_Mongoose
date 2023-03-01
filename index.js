require("dotenv").config();

const express = require("express");

const PORT = process.env.PORT;
const authRouter = require("./routes/authRouters");
const ConnectDB = require("./config/db");
const catchError = require("./middlewares/catchErrors");

const app = express();
app.use(express.json());

ConnectDB();

app.use("/auth", authRouter);

app.use(catchError);

app.listen(PORT, (req, res) => {
  console.log(`server is runnning on ${PORT}`);
});
