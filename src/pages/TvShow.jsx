import { useEffect, useState } from 'react'
import { useShows } from '../hooks/useShows'
import { useParams, useNavigate } from 'react-router-dom'
import './TvShow.css'
import Modal from '../components/Modal'

const TvShow = () => {
  let { id } = useParams()
  const navigate = useNavigate()
  const { show, loading, getShow } = useShows({ id })
  const [book, setBook] = useState(false)
  const [modal, setModal] = useState(false)
  const [user, setUser] = useState({
    fullName: '',
    email: '',
  })

  useEffect(() => {
    const getTvShow = async () => {
      const response = await getShow({ id })
      return response
    }
    getTvShow()
  }, [id, getShow])

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value, show })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    localStorage.setItem('booking', JSON.stringify(user))
    setModal(!modal)
  }

  return (
    <>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div
          className='tvShow-container'
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.4)), url(${show.image})`,
          }}>
          <div className='tvShow-info'>
            <h2 className='tvShow-name'>{show.name}</h2>
            <p className='tvShow-summary'>{show.summary}</p>
            <button className='tvShow-btn' onClick={() => setBook(!book)}>
              book now
            </button>
          </div>
          {book ? (
            <div className='bookShow-form'>
              <button
                className='close-form tvShow-btn'
                onClick={() => setBook(!book)}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='#000000'
                  width='100%'
                  height='100%'
                  viewBox='0 0 24 24'
                  stroke='#000000'
                  strokeWidth='0.792'>
                  <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                  <g
                    id='SVGRepo_tracerCarrier'
                    strokeLinecap='round'
                    strokeLinejoin='round'></g>
                  <g id='SVGRepo_iconCarrier'>
                    <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'></path>
                  </g>
                </svg>
              </button>
              <form className='tvShow-form' onSubmit={handleSubmit}>
                <label htmlFor='fullName' className='tvShow-label'>
                  Full Name
                </label>
                <input
                  id='fullName'
                  className='tvShow-input'
                  name='fullName'
                  required
                  placeholder='John Doe'
                  onChange={handleChange}
                />
                <label htmlFor='email' className='tvShow-label'>
                  Email
                </label>
                <input
                  id='email'
                  name='email'
                  className='tvShow-input'
                  type='email'
                  required
                  onChange={handleChange}
                  placeholder='johndoe@email.com'
                />
                <label htmlFor='show' className='tvShow-label'>
                  Show
                </label>
                <input
                  id='show'
                  className='tvShow-input'
                  value={show.name}
                  disabled
                />
                <label htmlFor='language' className='tvShow-label'>
                  Language
                </label>
                <input
                  id='language'
                  className='tvShow-input'
                  disabled
                  value={show.language}
                />
                <label htmlFor='company' className='tvShow-label'>
                  Company
                </label>
                <input
                  id='company'
                  className='tvShow-input'
                  disabled
                  value={show.company}
                />
                <label htmlFor='schedule' className='tvShow-label'>
                  Schedule
                </label>
                <input
                  id='schedule'
                  className='tvShow-input'
                  value={`${show.schedule.days} - ${show.schedule.time}`}
                  disabled
                />
                <button className='tvShow-btn'>submit</button>
              </form>
            </div>
          ) : null}
          <div className='tvShow-data'>
            <div className='tvShow-category'>
              {show.genre?.map((genre) => (
                <h3 className='tvShow-infoCat' key={genre}>
                  {genre}
                </h3>
              ))}
              <h5 className='tvShow-categoryInfo'>genre</h5>
            </div>
            <div className='tvShow-category'>
              <h3 className='tvShow-infoCat'>{show.country}</h3>
              <h5 className='tvShow-categoryInfo'>country</h5>
            </div>
            <div className='tvShow-category'>
              <h3 className='tvShow-infoCat'>{show.language}</h3>
              <h5 className='tvShow-categoryInfo'>language</h5>
            </div>
            <div className='tvShow-category'>
              <h3 className='tvShow-infoCat'>{show.rating}</h3>
              <h5 className='tvShow-categoryInfo'>rating</h5>
            </div>
          </div>
          <Modal show={modal}>Your Show has been Booked</Modal>
          <button
            type='button'
            className='tvShow-back tvShow-btn'
            onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
      )}
    </>
  )
}

export default TvShow
