import axios from 'axios';

const getPokemonList = async (page, limit) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * limit}&limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
const getPokemonListByType = async (url) => {
    try {
        const response = await axios.get(`${url}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
const getPokemonListByAbility= async (url) => {
    try {
        const response = await axios.get(`${url}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
const getPokemonDetails = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching Pokémon details:', error);
        throw error;
    }
};
const getPokemonTypes = async () => {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/type');
        return await response.json();
    } catch (error) {
        console.error('Error fetching Pokémon types:', error);
        throw error;
    }
};
const getPokemonAbilities = async () => {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/ability?offset=0&limit=500');
        return await response.json();
    } catch (error) {
        console.error('Error fetching Pokémon types:', error);
        throw error;
    }
};
export { getPokemonList,getPokemonDetails,getPokemonTypes,getPokemonListByType,getPokemonAbilities,getPokemonListByAbility  };