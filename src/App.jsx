import { useState, useEffect } from 'react';
import './App.css';
// import DetailPokemon from './detailPokemon';

function DetailPokemon({ url }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setDetails(data));
  }, [url]);

  if (!details) return <p>...</p>;

  return (
    <div class="pokemons">
      <div class="pokemon_card">
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

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
      .then((res) => {
        if (!res.ok) throw new Error('Erreur réseau');
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

  if (loading) return <p>Chargement...</p>;
  if (erreur) return <p>Erreur : {erreur}</p>;

  return (
    <ul>
      {pokemons.map((p) => (
        <li key={p.name}>
          <DetailPokemon url={p.url} />
        </li>
      ))}
    </ul>
  );
}

export default App;