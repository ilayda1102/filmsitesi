const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

const JWT_SECRET = "film_sitesi_gizli_anahtar";

const register = async (req, res) => {
    const { username, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (existingUser) {
        return res.status(409).json({
            message: "Bu e-posta ile zaten bir hesap var.",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword,
        },
    });

    return res.status(201).json({
        message: "Kullanıcı oluşturuldu.",
    });
};


const login = async (req, res) => {
    const { email, password} = req.body;
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (!user) {
        return res.status(404).send("Kullanıcı bulunamadı..");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).send("Şifre yanlış..")
    }

    const token = jwt.sign(
        {
            id: user.id,
            email:user.email,
        },
        JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );

    res.status(200).json({
        message: "Giriş başarılı.",
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
        },
    });
}


const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) {
            return res.status(404).json({
                message: "Kullanıcı bulunamadı."
            });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Mevcut şifre yanlış."
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                password: hashedPassword,
            },
        });

        return res.status(200).json({
            message: "Şifre başarıyla değiştirildi."
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Sunucu hatası."
        });
    }
};

const changeEmail = async (req, res) => {
    const { currentPassword, newEmail } = req.body;
    const userId = req.user.id;

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) {
            return res.status(404).json({
                message: "Kullanıcı bulunamadı."
            });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Mevcut şifre yanlış."
            });
        }

        const existingEmail = await prisma.user.findUnique({
            where: {
                email: newEmail,
            },
        });

        if (existingEmail) {
            return res.status(400).json({
                message: "Bu e-posta zaten kullanılıyor."
            });
        }

        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                email: newEmail,
            },
        });

        return res.status(200).json({
            message: "E-posta başarıyla değiştirildi."
        });

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Sunucu hatası."
        });
    }
};


module.exports = {
    register,
    login,
    changePassword,
    changeEmail,
};