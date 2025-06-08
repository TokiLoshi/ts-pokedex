// Use fetch api to make get requests
import { State } from "./state.js";

export class PokeAPI {
	private static readonly baseURL = "https://pokeapi.co/api/v2";
	constructor() {}

	async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
		// implement this
		const baseurl = "https://pokeapi.co/api/v2/" + pageURL;
		let url = baseurl;
		if (pageURL && pageURL != "location-area/") {
			url = pageURL;
		}
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}
			const json: ShallowLocations = await response.json();
			return json;
		} catch (error) {
			console.error(error);
			throw error;
		}
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
