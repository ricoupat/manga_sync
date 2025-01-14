const axios = require("axios");
const mangaCacheManager = require('../caches/mangaCacheManager');

class apiMangaRepository {
    static ANILIST_API_URL = 'https://graphql.anilist.co';
    static CACHE_EXPIRATION = 3600;
    static EXCLUDE_GENRE = ["Hentai", "Ecchi", "Yaoi", "Yuri"]

    async searchMangas(searchQuery, page=1) {
        const cacheKey = `searchMangas_${searchQuery}_page_${page}`;
        try {
            const cachedData = await mangaCacheManager.get(cacheKey);

            if (cachedData) {
                return JSON.parse(cachedData);
            }

            const query = `
            query($genreNotIn: [String]) {
                Page(page: ${page}, perPage: 20) {
                    media(type: MANGA, ${searchQuery} sort: TRENDING_DESC, genre_not_in: $genreNotIn) {
                        id
                        title {
                            romaji
                         }
                        coverImage {
                            large
                        }
                        description
                    }
                }
            }`;
            const variables = {
                genreNotIn: apiMangaRepository.EXCLUDE_GENRE
            }
            const response = await axios.post(apiMangaRepository.ANILIST_API_URL, {query, variables});
            const mangaList = response.data.data.Page.media;
            await mangaCacheManager.set(
                cacheKey,
                JSON.stringify(mangaList),
                apiMangaRepository.CACHE_EXPIRATION
            );
            return mangaList;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async fetchSearchPageDefaultManga(page = 1) {
        const cacheKey = `default_page_${page}`;
        try {
            const cachedData = await mangaCacheManager.get(cacheKey);
            if (cachedData) {
                return JSON.parse(cachedData);
            }
            const query = `
            query ($currentPage : Int, $genreNotIn: [String]) {
                Page(page: $currentPage, perPage: 20) {
                    media(type: MANGA, sort: TRENDING_DESC, genre_not_in: $genreNotIn) {
                        id
                        title {
                            romaji
                        }
                        coverImage {
                            large
                        }
                        description
                    }
                }
            }`;
            const variables = {
                currentPage: page,
                genreNotIn: apiMangaRepository.EXCLUDE_GENRE
            }
            const response = await axios.post(apiMangaRepository.ANILIST_API_URL, {query, variables});
            const mangaList = response.data.data.Page.media;
            await mangaCacheManager.set(
                cacheKey,
                JSON.stringify(mangaList),
                apiMangaRepository.CACHE_EXPIRATION
            );
            return mangaList;

        } catch (error) {
            throw error;
        }
    }

    async fetchHomePageTrendingMangas() {
        const cacheKey = `trending_page_1`;
        try {
            const cachedData = await mangaCacheManager.get(cacheKey);
            if (cachedData) {
                return JSON.parse(cachedData);
            }
            const query = `
            query ($genreNotIn: [String]) {
                Page(page: 1, perPage: 20) {
                    media(type: MANGA, sort: TRENDING_DESC, genre_not_in: $genreNotIn) {
                        id
                        title {
                            romaji
                        }
                        coverImage {
                            large
                        }
                        description
                    }
                }
            }`;

            const variables = {
                genreNotIn: apiMangaRepository.EXCLUDE_GENRE
            }

            const response = await axios.post(apiMangaRepository.ANILIST_API_URL, {query, variables});
            const mangaList = response.data.data.Page.media;

            await mangaCacheManager.set(
                cacheKey,
                JSON.stringify(mangaList),
                apiMangaRepository.CACHE_EXPIRATION
            );
            return mangaList;

        } catch (error) {
            throw error;
        }
    }

    async fetchHomePageUpdatedMangas() {
        const cacheKey = `updated_page_1`;
        try {
            const cachedData = await mangaCacheManager.get(cacheKey);
            if (cachedData) {
                return JSON.parse(cachedData);
            }
            const query = `
            query($genreNotIn: [String]) {
                Page(page: 1, perPage: 20) {
                    media(type: MANGA, sort: UPDATED_AT_DESC, genre_not_in: $genreNotIn) {
                        id
                        title {
                            romaji
                        }
                        coverImage {
                            large
                        }
                        description
                    }
                }
            }`;

            const variables = {
                genreNotIn: apiMangaRepository.EXCLUDE_GENRE
            }

            const response = await axios.post(apiMangaRepository.ANILIST_API_URL, {query, variables});
            const mangaList = response.data.data.Page.media;

            await mangaCacheManager.set(
                cacheKey,
                JSON.stringify(mangaList),
                apiMangaRepository.CACHE_EXPIRATION
            );
            return mangaList;

        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = new apiMangaRepository();