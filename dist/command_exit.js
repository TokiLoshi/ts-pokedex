export async function commandExit(state, ...args) {
    console.log("Closing the Pokedex... Goodbye!");
    state.readline.close();
    process.exit(0);
}
