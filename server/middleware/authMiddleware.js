const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Middleware to check if user is authenticated
const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log("Authorization Header: ", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    // console.log("Decoded Token: ", decoded);
    req.user = await User.findById(decoded._id).select("-password");
    // console.log(req.user);

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }
    next();
  } catch (error) {
    console.log("JWT Verification Error: ", error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

// Middleware to check if the user has the admin role
const requireAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }
  next();
};

module.exports = { requireAuth, requireAdmin };
