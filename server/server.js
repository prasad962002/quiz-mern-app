require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");
const userRoute = require("./routes/userRoute");
const { requireAuth, requireAdmin } = require("./middleware/authMiddleware");


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
  next();
});

// Public route
app.get("/api/public", (req, res) => {
  res.json({ message: "This is a public route" });
});

// Protected route for authenticated users
app.get("/api/user", requireAuth, (req, res) => {
  res.json({ message: "This is a protected route for users" });
});

// Admin-only route
app.get("/api/admin", requireAuth, requireAdmin, (req, res) => {
  res.json({ message: "This is a protected route for admins" });
});

async function createUser() {
  try {
    const newUser = new User({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "securepassword123", // Note: Hash the password in real-world applications
    });
    const savedUser = await newUser.save(); // Save the user to the database
    console.log("User added successfully:", savedUser);
  } catch (error) {
    console.error("Error adding user:", error);
  }
}

app.get("/hi", (req, res) => {
  res.send("Hello");
  createUser();
});
const PORT = process.env.PORT || 3000;

app.use("/api/user", userRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Connect to db Listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
