const express = require('express');
const router = express.Router();
const mangaController = require("../controllers/apiMangaController");

router.get("/search", mangaController.fetchSearchManga);
router.post("/trending", mangaController.fetchTrendingManga)
router.post("/newest", mangaController.fetchNewestManga)

module.exports = router;