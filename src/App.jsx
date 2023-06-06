import { useRef } from 'react'
import './App.css'
import Shows from './components/Shows'
import { useShows } from './hooks/useShows'
import { useState, useEffect } from 'react'

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
    if (search.length < 2) {
      setError('Must provide at least 2 characters')
      return
    }
    setError(null)
  }, [search])

  return { search, setSearch, error }
}

function App() {
  const { search, setSearch, error } = useSearch()
  const { shows, loading, getShows } = useShows({ search })

  const handleSubmit = (event) => {
    event.preventDefault()
    getShows()
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    if (newSearch.startsWith(' ')) return
    setSearch(event.target.value)
  }

  return (
    <div className='page'>
      <header>
        <h1>Showbuster</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent',
              outline: 'none',
            }}
            onChange={handleChange}
            name='search'
            value={search}
            placeholder='Girls, Breaking Bad ...'
          />
          <button>search</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>{loading ? <p>Cargando...</p> : <Shows shows={shows} />}</main>
    </div>
  )
}

export default App
