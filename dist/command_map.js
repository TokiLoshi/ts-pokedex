export async function getMap(state) {
    let nextLocation = state.nextLocationURL;
    if (nextLocation !== null) {
        const locations = await state.pokeAPI.fetchLocations(state.nextLocationURL);
        state.nextLocationURL = locations.next;
        const allResults = locations;
        let next = "";
        let prev = "";
        if (allResults.next) {
            next = allResults.next;
        }
        if (allResults.previous) {
            prev = allResults.previous;
        }
        state.prevLocationURL = prev;
        for (let location of allResults.results) {
            console.log(location.name);
        }
        state.nextLocationURL = next;
    }
}
