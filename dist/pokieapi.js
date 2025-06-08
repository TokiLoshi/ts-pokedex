export class PokeAPI {
	static baseURL = "https://pokeapi.co/api/v2";
	constructor() {}
	async fetchLocations(pageURL) {
		// implement this
		const baseurl = "https://pokeapi.co/api/v2/" + pageURL;
		let url = baseurl;
		if (pageURL && pageURL != "location/") {
			url = pageURL;
		}
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}
			const json = await response.json();
			return json;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
	async fetchLocation(locationName) {
		const url = "https://pokeapi.co/api/v2/" + locationName;
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}
			const json = await response.json();
			console.log(json);
			return json;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}
