import { startREPL } from "./repl.js";
import { initState } from "./state.js";
async function main() {
    // Cache Interval set to five minutes
    // const state = initState(1000 * 60 * 5);
    const state = initState(1000 * 60);
    await startREPL(state);
}
main();
