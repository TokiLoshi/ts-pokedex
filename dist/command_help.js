export async function helpCommand(state) {
    console.log();
    console.log("Welcome to the Pokedex!");
    console.log("Usage:");
    console.log();
    // const commands = getCommands();
    const commands = state.commandRegistry;
    for (const command in commands) {
        console.log(`${commands[command].name}: ${commands[command].description}`);
    }
}
