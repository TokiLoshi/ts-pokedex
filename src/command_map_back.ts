import { State } from "./state.js";

export async function goBack(state: State) {
	console.log("Previous locations: ", state.prevLocationURL);
	if (!state.prevLocationURL) {
		console.log("No previous location, you're on the first page");
		return;
	}
	let prevLocation = state.prevLocationURL;

	const locations = await state.pokeAPI.fetchLocations(prevLocation);

	state.nextLocationURL = locations.next;
	state.prevLocationURL = locations.previous;

	for (const location of locations.results) {
		console.log(location.name);
	}
}
