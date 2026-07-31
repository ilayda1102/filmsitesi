const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const addFavorite = async (req, res) => {

    const { tmdbId, mediaType } = req.body;

    try {
        const favorite = await prisma.favorite.create({
            data: {
                tmdbId,
                mediaType,
                userId: req.user.id,
            },
        });

        res.status(201).json(favorite);
    } catch (error) {
        /*res.status(400).json({
            message: "Zaten favorilerinizde.",
        });*/
        console.log(error);
        throw error;
    }
};

const getFavorites = async (req, res) => {
    const favorites = await prisma.favorite.findMany({
        where: {
            userId: req.user.id,
        },
    });

    res.json(favorites);
};

const removeFavorite = async (req, res) => {
    const tmdbId = Number(req.params.tmdbId);

    await prisma.favorite.delete({
        where: {
            userId_tmdbId: {
                userId: req.user.id,
                tmdbId,
            },
        },
    });

    res.json ({
        message: "Favorilerden kaldırıldı.",
    });
};

module.exports = {
    addFavorite,
    getFavorites,
    removeFavorite,
};