import { useRef, useState } from 'react'
import { searchShows } from '../services/shows'

export const useShows = ({ search }) => {
  const [shows, setShows] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const previousSearch = useRef(search)

  const getShows = async () => {
    if (search === previousSearch.current) return
    try {
      setLoading(true)
      setError(null)
      previousSearch.current = search
      const newShows = await searchShows({ search })
      setShows(newShows)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { shows, getShows, loading }
}
