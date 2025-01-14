const apiMangaRepository = require('../Repository/apiMangaRepository');

class apiMangaService {
    async get(searchQuery, page) {
        try {
            const rawData = await apiMangaRepository.searchMangas(searchQuery, page);

            return rawData.map((manga) => ({
                id: manga.id,
                title: manga.title.romaji,
                coverImage: manga.coverImage.large,
                description: manga.description,
            }))
        } catch (error) {
            throw error;
        }
    }

    async fetchSearchPageManga(searchQuery, page) {
        try {
            let data;
            if (searchQuery) {
                data = await apiMangaRepository.searchMangas(searchQuery, page);
            }
            else {
                data = await apiMangaRepository.fetchSearchPageDefaultManga(page);
            }

            return data.map((manga) => ({
                id: manga.id,
                title: manga.title.romaji,
                coverImage: manga.coverImage.large,
                description: manga.description,
            }))
        } catch (error) {
            throw error;
        }
    }

    async fetchHomePageSortedManga(sort) {
        try {
            let data;
            if (sort.sort === "TRENDING_DESC") {
                data = await apiMangaRepository.fetchHomePageTrendingMangas();
            }
            else {
                data = await apiMangaRepository.fetchHomePageUpdatedMangas();
            }

            return data.map((manga) => ({
                id: manga.id,
                title: manga.title.romaji,
                coverImage: manga.coverImage.large,
                description: manga.description,
            }))
        } catch (error) {
           throw error;
        }
    }
}

module.exports = new apiMangaService();