import { Cache } from "./pokecache.js";

export class PokeAPI {
	private static readonly baseURL = "https://pokeapi.co/api/v2";
	private cache: Cache;

	constructor(cacheInterval: number) {
		this.cache = new Cache(cacheInterval);
	}
	closeCache() {
		this.cache.stopReapLoop();
	}

	async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
		const url = pageURL || `${PokeAPI.baseURL}/location-area`;
		console.log("URL in location: ", url);

		const cached = this.cache.get<ShallowLocations>(url);

		if (cached) {
			return cached;
		}

		try {
			const response = await fetch(url);

			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}

			const locations: ShallowLocations = await response.json();

			this.cache.add(url, locations);
			return locations;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async fetchLocation(locationName: string): Promise<Location> {
		const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

		const cached = this.cache.get<Location>(url);

		if (cached) {
			return cached;
		}

		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}

			const location: Location = await response.json();
			console.log("Location:", location);
			this.cache.add(url, location);
			return location;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}

export interface ShallowLocations {
	count: number;
	next: string;
	previous: string;
	results: Result[];
}

export interface Result {
	name: string;
	url: string;
}

export type Location = {
	encounter_method_rates: {
		encounter_method: {
			name: string;
			url: string;
		};
		version_details: {
			rate: number;
			version: {
				name: string;
				url: string;
			};
		}[];
	}[];
	game_index: number;
	id: number;
	location: {
		name: string;
		url: string;
	};
	name: string;
	names: {
		language: {
			name: string;
			url: string;
		};
		name: string;
	}[];
	pokemon_encounters: {
		pokemon: {
			name: string;
			url: string;
		};
		version_details: {
			encounter_details: {
				chance: number;
				condition_values: any[];
				max_level: number;
				method: {
					name: string;
					url: string;
				};
				min_level: number;
			}[];
			max_chance: number;
			version: {
				name: string;
				url: string;
			};
		}[];
	}[];
};
