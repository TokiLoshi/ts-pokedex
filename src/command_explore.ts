import { State } from "./state.js";
import { PokeAPI, Result } from "./pokeapi.js";

export async function explore(name: string, state: State) {
	// if pokemon
	console.log(`Expoloring: ${name}...`);
	console.log(`Found pokemon: `);
	const url = "https://pokeapi.co/api/v2/location-area/" + name;
	// use the same endpoint but add in the name
	/// concat name / id to get more information
	console.log(url);
	// https://pokeapi.co/api/v2/location-area/pastoria-city-area
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		const json: Result = await response.json();
		console.log("Json: ", json);
		for (let pokemon in json) {
			console.log(pokemon);
		}
		return json;
	} catch (error) {
		console.error(error);
		throw error;
	}

	// Parse pokemon name from response and display them
	// reuse the caching layer so that you're not respoloring
	// Pass extra args into the map so update the callback function signature
	// The new function signature so it spreads
}
