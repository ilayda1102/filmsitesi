const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createList = async (req, res) => {
    const { name } = req.body;
    const userId = req.user.id;

    try {
        const list = await prisma.list.create({
            data: {
                name,
                userId,
            },
        });

        return res.status(201).json(list);
    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Liste oluşturulamadı.",
        });
    }
};

const getLists = async (req, res) => {
    try {
        const userId = req.user.id;

        const lists = await prisma.list.findMany({
            where: {
                userId,
            },
            include: {
                items: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return res.status(200).json(lists);
    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Listeler getirilemedi.",
        });
    }
};

const addMovieToList = async (req, res) => {
    const listId = Number(req.params.listId);

    const {
        tmdbId,
        mediaType,
        title,
        posterPath,
        backdropPath,
    } = req.body;

    try {
        const movie = await prisma.listItem.create({
            data: {
                listId,
                tmdbId,
                mediaType,
                title,
                posterPath,
                backdropPath,
                backdropPath: backdropPath || posterPath,
            },
        });

        return res.status(201).json(movie);
    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Film listeye eklenemedi.",
        });
    }
};

const getListMovies = async (req, res) => {
    const listId = Number(req.params.listId);

    try {
        const movies = await prisma.listItem.findMany({
            where: {
                listId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return res.status(200).json(movies);
    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Liste filmleri getirilemedi.",
        });
    }
};

const removeMovieFromList = async (req, res) => {
    const listId = Number(req.params.listId);
    const tmdbId = Number(req.params.tmdbId);

    try {
        await prisma.listItem.delete({
            where: {
                listId_tmdbId: {
                    listId,
                    tmdbId,
                },
            },
        });

        return res.json({
            message: "Listeden kaldırıldı.",
        });
    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Listeden kaldıralamadı.",
        });
    }
};

module.exports = {
    createList,
    getLists,
    addMovieToList,
    getListMovies,
    removeMovieFromList,
};