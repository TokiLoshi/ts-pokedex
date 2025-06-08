export async function getMap(state) {
    // returns 20 location areas
    // Use Poke api
    let nextLocation = state.nextLocationsURL;
    if (nextLocation !== null) {
        const response = await state.pokeAPI.fetchLocations(nextLocation);
        const allResults = response;
        let next = null;
        let prev = null;
        if (allResults.next) {
            next = allResults.next;
        }
        if (allResults.previous) {
            prev = allResults.previous;
        }
        state.prevLocationsURL = prev;
        for (let location of allResults.results) {
            console.log(location.name);
        }
        state.nextLocationsURL = next;
    }
}
