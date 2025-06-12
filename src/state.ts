import { createInterface, type Interface } from "readline";
import { stdin, stdout } from "node:process";
import { getCommands } from "./repl.js";
import { PokeAPI } from "./pokeapi.js";
import { Pokemon } from "./command_catch.js";

export type State = {
	readline: Interface;
	commandRegistry: Record<string, CLICommand>;
	pokeAPI: PokeAPI;
	nextLocationURL: string;
	prevLocationURL: string;
	pokedex: Record<string, Pokemon>;
};

export type CLICommand = {
	name: string;
	description: string;
	callback: (state: State, ...args: string[]) => Promise<void>;
};

type Pokedex = {
	name: string;
	caught: Pokemon[];
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
		pokedex: {},
	};
}
