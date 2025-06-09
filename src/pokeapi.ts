// Use fetch api to make get requests
import { State } from "./state.js";
import { Cache, CacheEntry } from "./pokecache.js";

export class PokeAPI {
	private static readonly baseURL = "https://pokeapi.co/api/v2";
	pokeCache = new Cache(10);
	constructor() {}

	async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
		// implement this

		const baseurl = "https://pokeapi.co/api/v2/" + pageURL;
		let url = baseurl;
		if (pageURL && pageURL != "location-area/") {
			url = pageURL;
		}
		const cacheValue: undefined | CacheEntry<ShallowLocations> =
			this.pokeCache.get(url);

		if (!cacheValue) {
			try {
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error(`Response status: ${response.status}`);
				}
				const json: ShallowLocations = await response.json();

				this.pokeCache.add(url, json);
				return json;
			} catch (error) {
				console.error(error);
				throw error;
			}
		}
		return cacheValue;
	}

	async fetchLocation(locationName: string): Promise<Result> {
		const url = "https://pokeapi.co/api/v2/" + locationName;

		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}
			const json: Result = await response.json();

			return json;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}

export interface ShallowLocations {
	count: number;
	next: string | null;
	previous: string | null;
	results: Result[];
}

export interface Result {
	name: string;
	url: string;
}
