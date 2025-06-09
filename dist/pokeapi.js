import { Cache } from "./pokecache.js";
export class PokeAPI {
    static baseURL = "https://pokeapi.co/api/v2";
    pokeCache = new Cache(10);
    constructor() { }
    async fetchLocations(pageURL) {
        // implement this
        const baseurl = "https://pokeapi.co/api/v2/" + pageURL;
        let url = baseurl;
        if (pageURL && pageURL != "location-area/") {
            url = pageURL;
        }
        const cacheValue = this.pokeCache.get(url);
        if (!cacheValue) {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const json = await response.json();
                this.pokeCache.add(url, json);
                return json;
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        }
        return cacheValue.val;
    }
    async fetchLocation(locationName) {
        const url = "https://pokeapi.co/api/v2/" + locationName;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            return json;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
}
