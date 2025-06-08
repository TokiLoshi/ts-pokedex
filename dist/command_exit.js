export async function commandExit(state) {
    console.log("Closing the Pokedex... Goodbye!");
    state.readlineInterface.close();
}
