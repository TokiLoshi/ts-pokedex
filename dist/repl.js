import { stdin, stdout } from "node:process";
import { createInterface } from "node:readline";
const rl = createInterface({
    input: stdin,
    output: stdout,
    prompt: "Pokedex",
});
export function startREPL() {
    console.log("Pokedex > ");
    rl.on("line", (line) => {
        let prompt = rl.getPrompt();
        const cleanedPrompt = cleanInput(line);
        if (cleanedPrompt.length === 0) {
            rl.getPrompt();
        }
        else {
            console.log("Your command was:", cleanedPrompt[0]);
        }
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
