import { useState, useEffect } from 'react';
import './App.css';

function DetailPokemon({ url }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setDetails(data));
  }, [url]);

  if (!details) return <p>...</p>;

  return (
    <div className="pokemons">
      <div className="pokemon_card">
        <img src={details.sprites.front_default} alt={details.name} />
        <p>{details.name}</p>
        <p>Types : {details.types.map((t) => t.type.name).join(', ')}</p>
      </div>
    </div>
  );
}

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [recherche, setRecherche] = useState('');

  function handleChange(event) {
    setRecherche(event.target.value); 
  }

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
      .then((res) => {
        if (!res.ok) throw new Error('Erreur reseau');
        return res.json();
      })
      .then((data) => {
        setPokemons(data.results);
        setLoading(false);
      })
      .catch((err) => {
        setErreur(err.message);
        setLoading(false);
      });
  }, []);

  const pokemonsFiltres = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(recherche.toLowerCase())
  );

  if (loading) return <p>Chargement...</p>;
  if (erreur) return <p>Erreur : {erreur}</p>;

  return (
    <div>
      { }
      <input
        type="text"
        placeholder="Rechercher un Pokémon..."
        value={recherche}
        onChange={handleChange}
      />

      { }
      <ul>
        {pokemonsFiltres.map((p) => (
          <li key={p.name}>
            <DetailPokemon url={p.url} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;