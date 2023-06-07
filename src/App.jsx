import { useCallback, useRef } from 'react'
import logo from './assets/undraw_video_files_fu10.svg'
import './App.css'
import Shows from './components/Shows'
import { useShows } from './hooks/useShows'
import { useState, useEffect } from 'react'
import debounce from 'just-debounce-it'
import { Link, Outlet } from 'react-router-dom'

const useSearch = () => {
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError("Can't search an empty field")
      return
    }
    setError(null)
  }, [search])

  return { search, setSearch, error }
}

function App() {
  const { search, setSearch, error } = useSearch()
  const { shows, loading, getShowsBySearch } = useShows({ search })

  const debounceGetMovies = useCallback(
    debounce(
      (search) => {
        getShowsBySearch({ search })
      },
      [200]
    ),
    [getShowsBySearch]
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    getShowsBySearch({ search })
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    if (newSearch.startsWith(' ')) return
    setSearch(event.target.value)
    debounceGetMovies(newSearch)
  }

  return (
    <div>
      <div className='page'>
        <header className='header'>
          <Link to='#' className='logo'>
            <img src={logo} alt='logo' className='logo-img' />
            <h1 className='h1'>PlayPhare</h1>
          </Link>
          <form className='form' onSubmit={handleSubmit}>
            <input
              className={`search-input search${error ? '-error' : ''}`}
              style={{
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: error ? '#F3A200' : '#51e58d',
                outline: 'none',
              }}
              onChange={handleChange}
              name='search'
              value={search}
              placeholder={error ? `${error}` : 'Breaking Bad, Friends ...'}
            />
            <button className='search-btn'>search</button>
          </form>
        </header>

        <main>{loading ? <p>Cargando...</p> : <Shows shows={shows} />}</main>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default App
