import { useEffect, useState } from 'react'
import { useShows } from '../hooks/useShows'
import { useParams, useNavigate } from 'react-router-dom'
import './TvShow.css'

const TvShow = () => {
  let { id } = useParams()
  const navigate = useNavigate()
  const { show, loading, getShow } = useShows({ id })
  const [book, setBook] = useState(false)

  useEffect(() => {
    const getTvShow = async () => {
      const response = await getShow({ id })
      return response
    }
    getTvShow()
  }, [id, getShow])

  return (
    <>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div
          className='tvShow-container'
          style={{
            backgroundImage: `linear-gradient(black, white), url(${show.image})`,
          }}>
          <div className='tvShow-info'>
            <h2 className='tvShow-name'>{show.name}</h2>
            <p className='tvShow-summary'>{show.summary}</p>
            <button className='tvShow-btn'>book now</button>
          </div>
          {book ? (
            <form className='bookShow-form'>
              <input type='text' className='tvShow-input' />
              <input type='text' className='tvShow-input' />
              <input type='text' className='tvShow-input' />
              <input type='text' className='tvShow-input' />
            </form>
          ) : null}
          <div className='tvShow-data'>
            <div className='tvShow category'>
              <h3 className='tvShow-info'>{show.genre}</h3>
              <h5 className='tvShow-categoryInfo'>genre</h5>
            </div>
            <div className='tvShow category'>
              <h3 className='tvShow-info'>{show.country}</h3>
              <h5 className='tvShow-categoryInfo'>country</h5>
            </div>
            <div className='tvShow category'>
              <h3 className='tvShow-info'>{show.language}</h3>
              <h5 className='tvShow-categoryInfo'>language</h5>
            </div>
            <div className='tvShow category'>
              <h3 className='tvShow-info'>{show.rating}</h3>
              <h5 className='tvShow-categoryInfo'>rating</h5>
            </div>
          </div>
          <button type='button' onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
      )}
    </>
  )
}

export default TvShow
