import './pokemon.css'
import {useState} from "react";

const Pokemon = ({ pokemon }) => {
    const { name, id, sprites, types, stats } = pokemon;
    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    return (
        <div className="Pokemon" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {!isHovered &&
                <div>
                    <img src={sprites.front_default} alt={name} />
                    <h3>{name}</h3>
                    <p>ID: {id}</p>
                </div>
            }
            {isHovered &&
                <div>
                    <h3>{name}</h3>
                    {stats.map((stat,index) => (
                        <h4  key={index}>{stat.stat.name}:{stat.base_stat}</h4>
                        ))}
                </div>
            }
            {types.map((type,index) => (
              <span key={index} className='type'>{type.type.name}</span>
            ))}
        </div>
    );
};

export default Pokemon;