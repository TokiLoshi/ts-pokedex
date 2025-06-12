export async function catchCommand(state, ...args) {
    if (args.length !== 1) {
        console.log("You must provide a pokemon name to catch one");
        return;
    }
    const name = args[0];
    console.log("NAME: ", name);
    console.log(`Throwing a Pokeball at ${name}...`);
    const url = "https://pokeapi.co/api/v2/pokemon/" + name + "/";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`Something went wrong fetching the api`);
        }
        const result = await response.json();
        const baseXP = result["base_experience"];
        console.log("BaseXP: ", baseXP);
        const userChance = Math.floor(Math.random() * baseXP + 50);
        console.log("User's chance: ", userChance);
        let caught = false;
        if (userChance > baseXP) {
            caught = true;
            console.log(`You caught ${name}`);
            const pokemondata = {
                base_experience: baseXP,
                id: result.id,
                name: name,
            };
            state.pokedex[name] = pokemondata;
            console.log("inspecting: ", state.pokedex[name]);
        }
        else {
            console.log(`${name} escaped`);
        }
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}
