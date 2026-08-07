const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    createList,
    getLists,
    addMovieToList,
    getListMovies,
    removeMovieFromList,
} = require("../controllers/listController");

router.post("/", authMiddleware, createList);
router.get("/", authMiddleware, getLists);
router.post("/:listId/items", authMiddleware, addMovieToList);
router.get("/:listId/items", authMiddleware, getListMovies);
router.delete("/:listId/items/:tmdbId", authMiddleware, removeMovieFromList);

module.exports = router;