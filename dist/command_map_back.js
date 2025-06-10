export async function goBack(state) {
    let prevLocation = state.prevLocationURL;
    if (prevLocation !== null) {
        const response = await state.pokeAPI.fetchLocations(prevLocation);
        const allResults = response;
        let last = "";
        let next = "";
        if (allResults.previous) {
            state.prevLocationURL = allResults.previous;
        }
        if (allResults.next) {
            state.nextLocationURL = next;
        }
        for (let location of allResults.results) {
            console.log(location.name);
        }
    }
}
