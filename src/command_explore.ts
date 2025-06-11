import { State } from "./state.js";
import { PokeAPI, Location } from "./pokeapi.js";

export async function explore(state: State, ...args: string[]) {
	// if pokemon
	console.log("args: ", args);
	const name = args[0];
	console.log(`Expoloring: ${name}...`);
	console.log(`Found pokemon: `);
	const url = "https://pokeapi.co/api/v2/location-area/" + name;
	// use the same endpoint but add in the name
	/// concat name / id to get more information

	// https://pokeapi.co/api/v2/location-area/pastoria-city-area
	try {
		const response = await state.pokeAPI.fetchLocation(name);

		for (let pokemon of response.pokemon_encounters) {
			console.log(`-${pokemon.pokemon.name}`);
		}
	} catch (error) {
		console.error(error);
		throw error;
	}
}
