const jwt = require("jsonwebtoken");

const JWT_SECRET = "film_sitesi_gizli_anahtar";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Token bulunamadı.",
        });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Geçersiz token.",
        });
    }

    try {
        const user = jwt.verify(token, JWT_SECRET);

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Token geçersiz.",
        });
    }
};

module.exports = authMiddleware;