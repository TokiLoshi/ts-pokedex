export async function explore(state, ...args) {
    // if pokemon
    const name = args[0];
    console.log(`Expoloring: ${name}...`);
    console.log(`Found pokemon: `);
    const url = "https://pokeapi.co/api/v2/location-area/" + name;
    try {
        const response = await state.pokeAPI.fetchLocation(name);
        for (let pokemon of response.pokemon_encounters) {
            console.log(`-${pokemon.pokemon.name}`);
        }
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}
