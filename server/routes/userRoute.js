const express = require("express");
const {
  loginUser,
  signupUser,
  updateUser,
} = require("../controllers/userController");
const { requireAuth, requireAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.put("/update", requireAuth, updateUser);

//protected router User route auth
router.get("/user-auth", requireAuth, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});

//protected router Admin route auth
router.get("/admin-auth", requireAuth, requireAdmin, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});

module.exports = router;
