function DetailPokemon({ url }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setDetails(data));
  }, [url]);

  if (!details) return <p>...</p>;

  return (
    <div>
      <img src={details.sprites.front_default} alt={details.name} />
      <p>{details.name}</p>
      <p>Types : {details.types.map((t) => t.type.name).join(', ')}</p>

      <ul className="stats">
        {details.stats.map((s) => (
          <li key={s.stat.name}>
            {s.stat.name} : {s.base_stat}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DetailPokemon;