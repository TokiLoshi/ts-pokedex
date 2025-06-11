import { Cache } from "./pokecache.js";
export class PokeAPI {
    static baseURL = "https://pokeapi.co/api/v2";
    cache;
    constructor(cacheInterval) {
        this.cache = new Cache(cacheInterval);
    }
    closeCache() {
        this.cache.stopReapLoop();
    }
    async fetchLocations(pageURL) {
        const url = pageURL || `${PokeAPI.baseURL}/location-area`;
        console.log("URL in location: ", url);
        const cached = this.cache.get(url);
        if (cached) {
            return cached;
        }
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const locations = await response.json();
            this.cache.add(url, locations);
            return locations;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async fetchLocation(locationName) {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
        const cached = this.cache.get(url);
        if (cached) {
            return cached;
        }
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const location = await response.json();
            console.log("Location:", location);
            this.cache.add(url, location);
            return location;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
}
