import { stdin, stdout } from "node:process";
import { createInterface } from "node:readline";
import { commandExit } from "./command_exit.js";
import { helpCommand } from "./command_help.js";
import { State, CLICommand } from "./state.js";
import { getMap } from "./command_map.js";
import { goBack } from "./command_map_back.js";
import { explore } from "./command_explore.js";

export function getCommands(): Record<string, CLICommand> {
	return {
		exit: {
			name: "exit",
			description: "Exits the pokedex",
			callback: commandExit,
		},
		help: {
			name: "help",
			description: "Displays a help message",
			callback: helpCommand,
		},
		map: {
			name: "map",
			description: "Displays names of 20 locations in Pokemon world",
			callback: getMap,
		},
		mapb: {
			name: "mapb",
			description: "Displays names of the last 20 locations in Pokemon world",
			callback: goBack,
		},
		explore: {
			name: "explore",
			description: "Displays names of poke",
			callback: explore,
		},
	};
}

export async function startREPL(state: State): Promise<void> {
	state.readline.prompt();

	state.readline.on("line", async (input) => {
		const cleanedPrompt = cleanInput(input);
		if (cleanedPrompt.length === 0) {
			state.readline.prompt();
			return;
		}
		// const commandName = cleanedPrompt[0];
		// console.log(`Your command was ${commandName}`);
		const userCommand = cleanedPrompt.slice(1);
		console.log("User command: ", userCommand);

		// if (getCommands()[userCommand]) {
		if (state.commandRegistry[userCommand]) {
			// const executeCommand = getCommands()[userCommand].callback;
			// executeCommand(getCommands());
			const executeCommand = state.commandRegistry[userCommand].callback;
			executeCommand(state, ...args);
		} else {
			console.log("Unknown command");
		}

		state.readline.prompt();
	});
}

export function cleanInput(input: string): string[] {
	// logic goes here
	const words = input
		.split(" ")
		.map((word) => word.trim().toLowerCase())
		.filter((word) => word.length > 0);
	return words;
}
