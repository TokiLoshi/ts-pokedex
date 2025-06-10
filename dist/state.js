import { createInterface } from "readline";
import { getCommands } from "./repl.js";
import { PokeAPI } from "./pokeapi.js";
export function initState(cacheInterval) {
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
