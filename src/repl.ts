import { stdin, stdout } from "node:process";
import { createInterface } from "node:readline";
import { commandExit } from "./command_exit.js";
import { helpCommand } from "./command_help.js";

export type CLICommand = {
	name: string;
	description: string;
	callback: (commands: Record<string, CLICommand>) => void;
};

export function getCommands(): Record<string, CLICommand> {
	return {
		exit: {
			name: "exit",
			description: "Exits the pokedex",
			callback: commandExit,
		},
		help: {
			name: "help",
			description: "PDisplays a help message",
			callback: helpCommand,
		},
	};
}

export function startREPL() {
	const rl = createInterface({
		input: stdin,
		output: stdout,
		prompt: "Pokedex > ",
	});
	rl.prompt();

	rl.on("line", async (input) => {
		const cleanedPrompt = cleanInput(input);
		if (cleanedPrompt.length === 0) {
			rl.getPrompt();
			return;
		}
		// const commandName = cleanedPrompt[0];
		// console.log(`Your command was ${commandName}`);
		const userCommand = cleanedPrompt[0];
		console.log("User command: ", userCommand);
		if (getCommands()[userCommand]) {
			console.log("found command");
			const executeCommand = getCommands()[userCommand].callback;
			executeCommand(getCommands());
		} else {
			console.log("Unknown command");
		}

		rl.getPrompt();
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
