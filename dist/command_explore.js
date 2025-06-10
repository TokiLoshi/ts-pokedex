export async function explore(state, ...args) {
    // if pokemon
    console.log("args: ", args);
    const name = args[0];
    console.log(`Expoloring: ${name}...`);
    console.log(`Found pokemon: `);
    const url = "https://pokeapi.co/api/v2/location-area/" + name;
    // use the same endpoint but add in the name
    /// concat name / id to get more information
    // https://pokeapi.co/api/v2/location-area/pastoria-city-area
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log("Json: ", json);
        for (let pokemon in json) {
            console.log(pokemon);
        }
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}
