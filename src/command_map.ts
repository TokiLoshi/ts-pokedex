import { State } from "./state.js";

export async function getMap(state: State) {
	console.log("Cache:", state.nextLocationURL);
	const locations = await state.pokeAPI.fetchLocations(state.nextLocationURL);
	state.nextLocationURL = locations.next;
	console.log("Setting next location: ", state.nextLocationURL);
	state.prevLocationURL = locations.previous;
	console.log("Setting pervious location: ", locations.previous);
	console.log(
		`Hoping this is cached: ${state.nextLocationURL} and prev ${state.prevLocationURL}`
	);
	for (let location of locations.results) {
		console.log(location.name);
	}
}
