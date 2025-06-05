import { getCommands } from "./repl.js";
export function helpCommand() {
    console.log("Welcome to the Pokedex!");
    console.log("Usage:");
    const commands = getCommands();
    for (let command in commands) {
        console.log(`${commands[command].name}: ${commands[command].description}`);
    }
}
