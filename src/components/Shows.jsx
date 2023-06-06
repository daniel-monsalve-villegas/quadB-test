const YesShows = ({ shows }) => {
  return (
    <ul className='shows'>
      {shows.map((show) => (
        <li key={show.id} className='show'>
          <h3>{show.title}</h3>
          <p>{show.year}</p>
          <img className='img-show' src={show.image} alt={show.title} />
        </li>
      ))}
    </ul>
  )
}

const NoShows = () => {
  return <p>Nothing to show here, search your show</p>
}

const Shows = ({ shows }) => {
  const hasShows = shows?.length > 0

  return hasShows ? <YesShows shows={shows} /> : <NoShows />
}

export default Shows
