require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const categoryRoute = require("./routes/categoryRoute");
const quizRoute = require("./routes/quizRoute");
const quizResultRoute = require("./routes/quizResultRoute");
const User = require("./models/User");

//express app
const app = express();

//middlewares
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  console.log("Request Body:", req.body);
  next();
});

const PORT = process.env.PORT || 3000;

app.use("/api/user", userRoute);

app.use("/api/category", categoryRoute);

app.use("/api/quiz", quizRoute);

app.use("/api/result", quizResultRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, async() => {
      console.log(`Connect to db Listening on port ${PORT}`);      
    });
  })
  .catch((error) => {
    console.log(error);
  });
