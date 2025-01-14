const apiMangaService = require("../services/apiMangaService");

class apiMangaController {
    async get(req, res) {
        try {
            const { searchQuery, page = 1 } = req.query;
            const mangaList = await apiMangaService.get(searchQuery, page);
            return res.status(200).json(mangaList)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    async fetchSearchManga(req, res) {
        try {
            const { searchQuery, page = 1 } = req.query;
            const mangaList = await apiMangaService.fetchSearchPageManga(searchQuery, page);
            return res.status(200).json(mangaList)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    async fetchTrendingManga(req, res) {
        try {
            const mangaList = await apiMangaService.fetchHomePageSortedManga({ sort: "TRENDING_DESC" });
            return res.status(200).json(mangaList)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    async fetchNewestManga(req, res) {
        try {
            const mangaList = await apiMangaService.fetchHomePageSortedManga({ sort: "UPDATED_AT_DESC" });
            return res.status(200).json(mangaList)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
}

module.exports = new apiMangaController();