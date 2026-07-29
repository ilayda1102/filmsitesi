const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

const register = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword
        }
    });

    res.send("Kullanıcı oluşturuldu.");
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
    res.send("Giriş başarılı.");
}


module.exports = {
    register,
    login
};