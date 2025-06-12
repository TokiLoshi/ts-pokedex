export async function inspectCommand(state, ...args) {
    if (args.length !== 1) {
        console.log("You must provide a pokemon name to inspect");
        return;
    }
    const pokemonQuery = args[0];
    const pokemon = state.pokedex;
    console.log("Inspecting Pokedex... ");
    if (pokemon[pokemonQuery]) {
        const inspectedPokemon = pokemon[pokemonQuery];
        console.log("Name: ", inspectedPokemon.name);
        console.log("Height: ", inspectedPokemon.height);
        console.log("Weight: ", inspectedPokemon.weight);
        console.log("Stats: ");
        for (const stat of inspectedPokemon.stats) {
            console.log(`- ${stat.stat.name}: ${stat.base_stat}`);
        }
        console.log("Types: ");
        for (const pokeType of inspectedPokemon.types) {
            console.log(` -${pokeType.type.name}`);
        }
    }
    else {
        console.log("You haven't caught that pokemon");
    }
}
