const redis = require('redis')

class mangaCacheManager {

    constructor() {
        this.client = redis.createClient();
        this.client.on('error', (err) => console.error('Redis error:', err));
        this.client.connect();
    }

    async get(key) {
        try {
            return await this.client.get(key);
        } catch (error) {
            console.error('Error getting cache key:', key, error);
            return null;
        }
    }

    async set(key, value, duration) {
        try {
            await this.client.set(key, value, { EX: duration });
        } catch (error) {
            console.error('Error setting cache key:', key, error);
        }
    }

    async delete(key) {
        try {
            await this.client.del(key);
        } catch (error) {
            console.error('Error deleting cache key:', key, error);
        }
    }
}

module.exports = new mangaCacheManager()