export async function helpCommand(state) {
    console.log("Welcome to the Pokedex!");
    console.log("Usage:");
    // const commands = getCommands();
    const commands = state.commandRegistry;
    for (let command in commands) {
        console.log(`${commands[command].name}: ${commands[command].description}`);
    }
}
