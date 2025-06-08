import { getCommands } from "./repl.js";
import { State, CLICommand } from "./state.js";

export async function helpCommand(state: State): Promise<void> {
	console.log("Welcome to the Pokedex!");
	console.log("Usage:");
	// const commands = getCommands();
	const commands = state.commandRegistry;
	for (let command in commands) {
		console.log(`${commands[command].name}: ${commands[command].description}`);
	}
}
