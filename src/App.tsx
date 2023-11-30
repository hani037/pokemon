import {useEffect, useState} from 'react'
import './App.css'
import Pokemon from "./components/pokemon";
import {
    getPokemonAbilities,
    getPokemonDetails,
    getPokemonList, getPokemonListByAbility,
    getPokemonListByType,
    getPokemonTypes
} from "./util/data";

function App() {
    const [pokemonList, setPokemonList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [typesList, setTypesList] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [abilitiesList, setAbilitiesList] = useState([]);
    const [selectedAbility, setSelectedAbility] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (searchTerm) {
                    setSelectedType('')
                    setSelectedAbility('')
                    const response = await getPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
                    setPokemonList([response]);
                    setTotalPages(1);
                    setCurrentPage(1);
                } else {
                    const data = await getPokemonList(currentPage, 10);
                    const detailsPromises = data.results.map(async (pokemon) => {
                        return await getPokemonDetails(pokemon.url);
                    });
                    const detailsData = await Promise.all(detailsPromises);
                    setPokemonList(detailsData);
                    setTotalPages(Math.ceil(data.count / 10));
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [currentPage, searchTerm]);
    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const response = await getPokemonTypes();
                setTypesList(response.results);
            } catch (error) {
                console.error('Error fetching Pokémon types:', error);
            }
        };

        fetchTypes();
    }, []);
    useEffect(() => {
        const fetchAbilities = async () => {
            try {
                const response = await getPokemonAbilities();
                setAbilitiesList(response.results);
            } catch (error) {
                console.error('Error fetching Pokémon types:', error);
            }
        };

        fetchAbilities();
    }, []);
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
        if(selectedAbility||selectedType){
            setSelectedAbility('')
            setSelectedType('')
            setCurrentPage(1);
        }
    };

    const handleSearch = async () => {
        if (!searchTerm) {
            setCurrentPage(1);
            setTotalPages(0);
        } else {
            try {
                const response = await getPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
                setPokemonList([response]);
                setTotalPages(1);
            } catch (error) {
                console.error('Error searching for Pokémon:', error);
                setPokemonList([]);
                setTotalPages(0);
            }
        }
    };

    const handleTypeChange = async (event) => {
        setCurrentPage(1)
        setSelectedAbility('')
        const type = event.target.value;
        setSelectedType(type)
        const data = await getPokemonListByType(type);
        const detailsPromises = data.pokemon.map(async ({pokemon, slot}) => {
            return await getPokemonDetails(pokemon.url);
        });
        const detailsData = await Promise.all(detailsPromises);
        setPokemonList(detailsData);
    };
    const handleAbilityChange = async (event) => {
        setCurrentPage(1)
        setSelectedType('')
        const ability = event.target.value;
        setSelectedAbility(ability)
        const data = await getPokemonListByAbility(ability);
        const detailsPromises = data.pokemon.map(async ({pokemon, slot}) => {
            return await getPokemonDetails(pokemon.url);
        });
        const detailsData = await Promise.all(detailsPromises);
        setPokemonList(detailsData);
    };
    return (
        <div>
            <h2 className='title'>Pokedex</h2>
            <div className='container'>
                <span>{`Page ${currentPage} `}</span>
                <button className='button previous'  onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                <button className='button next' onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                <div className="search-container">
                    <input
                        className='input-search'
                        type="text"
                        placeholder="Search by Pokémon name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className='button' onClick={handleSearch}>Search</button>
                </div>
                <div className="filter-container">
                    <label htmlFor="typeFilter">Filter by Type:</label>
                    <select id="typeFilter" value={selectedType} onChange={handleTypeChange}>
                        <option value="">All Types</option>
                        {typesList.map((type) => (
                            <option key={type.name} value={type.url}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="filter-container">
                    <label htmlFor="typeFilter">Filter by Ability:</label>
                    <select id="typeFilter" value={selectedAbility} onChange={handleAbilityChange}>
                        <option value="">All Abilities</option>
                        {abilitiesList.map((ability) => (
                            <option key={ability.name} value={ability.url}>
                                {ability.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="PokemonList">
                    {pokemonList.map((pokemon, index) => (
                        <Pokemon key={index} pokemon={pokemon}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default App
