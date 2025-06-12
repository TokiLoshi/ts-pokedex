import { State } from "./state.js";

export async function showPokedex(state: State) {
	const pokedex = state.pokedex;
	console.log("Your pokedex: ");
	for (const pokemon in pokedex) {
		console.log(`- ${pokedex[pokemon].name}`);
	}
}
