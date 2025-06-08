export async function goBack(state) {
    let prevLocation = state.prevLocationsURL;
    if (prevLocation !== null) {
        const response = await state.pokeAPI.fetchLocations(prevLocation);
        const allResults = response;
        let last = null;
        let next = null;
        if (allResults.previous) {
            state.prevLocationsURL = allResults.previous;
        }
        if (allResults.next) {
            state.nextLocationsURL = next;
        }
        for (let location of allResults.results) {
            console.log(location.name);
        }
    }
}
