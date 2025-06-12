import { commandExit } from "./command_exit.js";
import { helpCommand } from "./command_help.js";
import { getMap } from "./command_map.js";
import { goBack } from "./command_map_back.js";
import { explore } from "./command_explore.js";
import { catchCommand } from "./command_catch.js";
import { inspectCommand } from "./command_inspect.js";
import { showPokedex } from "./command_pokedex.js";
export function getCommands() {
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
        catch: {
            name: "catch",
            description: "Catches a pokemon",
            callback: catchCommand,
        },
        inspect: {
            name: "inspect",
            description: "Inspects a pokemon",
            callback: inspectCommand,
        },
        pokedex: {
            name: "pokedex",
            description: "Prints out pokedex",
            callback: showPokedex,
        },
    };
}
export async function startREPL(state) {
    state.readline.prompt();
    state.readline.on("line", async (input) => {
        const words = cleanInput(input);
        if (words.length === 0) {
            state.readline.prompt();
            return;
        }
        const commandName = words[0];
        const args = words.slice(1);
        const userCommand = state.commandRegistry[commandName];
        if (!userCommand) {
            console.log(`Unkown command ${commandName}`);
            state.readline.prompt();
            return;
        }
        try {
            await userCommand.callback(state, ...args);
        }
        catch (e) {
            console.log(e.message);
        }
        state.readline.prompt();
    });
}
export function cleanInput(input) {
    // logic goes here
    const words = input
        .split(" ")
        .map((word) => word.trim().toLowerCase())
        .filter((word) => word.length > 0);
    return words;
}
