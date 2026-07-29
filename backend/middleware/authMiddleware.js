const jwt = require("jsonwebtoken");
const JWT_SECRET = "film_sitesi_gizli_anahtar";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Token bulunamadı."
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Geçersiz veya süresi dolmuş oturum."
        });
    }
};

module.exports = authMiddleware;