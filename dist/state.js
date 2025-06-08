import { createInterface } from "readline";
import { stdin, stdout } from "node:process";
import { getCommands } from "./repl.js";
import { PokeAPI } from "./pokeapi.js";
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
