const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const { register, login, changePassword, changeEmail } = require("../controllers/userController");

router.post("/register", register);
router.post("/login", login);
router.put("/change-password", authMiddleware, changePassword);
router.put("/change-email",authMiddleware, changeEmail);

router.get("/profile", authMiddleware, (req, res) => {
    res.json({
        message: "Profil bilgilerine erişildi.",
        user: req.user
    });
});


module.exports = router;