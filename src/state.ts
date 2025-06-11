import { createInterface, type Interface } from "readline";
import { stdin, stdout } from "node:process";
import { getCommands } from "./repl.js";
import { PokeAPI } from "./pokeapi.js";

export type State = {
	readline: Interface;
	commandRegistry: Record<string, CLICommand>;
	pokeAPI: PokeAPI;
	nextLocationURL: string;
	prevLocationURL: string;
};

export type CLICommand = {
	name: string;
	description: string;
	callback: (state: State, ...args: string[]) => Promise<void>;
};

export function initState(cacheInterval: number) {
	const rl = createInterface({
		input: process.stdin,
		output: process.stdout,
		prompt: "Pokedex > ",
	});
	return {
		readline: rl,
		commandRegistry: getCommands(),
		pokeAPI: new PokeAPI(cacheInterval),
		nextLocationURL: "",
		prevLocationURL: "",
	};
}

// Update state to contain PokeAPI object
