import { createInterface, type Interface } from "readline";
import { stdin, stdout } from "node:process";
import { getCommands } from "./repl.js";
import { PokeAPI } from "./pokeapi.js";

export type State = {
	readlineInterface: Interface;
	commandRegistry: Record<string, CLICommand>;
	pokeAPI: PokeAPI;
	nextLocationsURL: string | null;
	prevLocationsURL: string | null;
};

export type CLICommand = {
	name: string;
	description: string;
	callback: (state: State) => Promise<void>;
};

export function initState() {
	const newState = {
		readlineInterface: createInterface({
			input: stdin,
			output: stdout,
			prompt: "Pokedex > ",
		}),
		commandRegistry: getCommands(),
		pokeAPI: new PokeAPI(),
		nextLocationsURL: "location-area/",
		prevLocationsURL: null,
	};

	return newState;
}

// Update state to contain PokeAPI object
