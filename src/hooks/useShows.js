import { useMemo, useRef, useState } from 'react'
import { searchShows, topMovies } from '../services/shows'
import { seeShow } from '../services/shows'

export const useShows = ({ search }) => {
  const [shows, setShows] = useState([])
  const [show, setShow] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const previousSearch = useRef(search)

  const getShowsBySearch = useMemo(() => {
    return async ({ search }) => {
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
  }, [])

  const getTopShows = async () => {
    try {
      setLoading(true)
      setError(null)
      const newShows = await topMovies()
      setShows(newShows)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const getShow = useMemo(() => {
  return async ({ id }) => {
    try {
      setLoading(true)
      setError(null)
      const newShow = await seeShow({ id })
      setShow(newShow)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }
  }, [])

  return { shows, show, loading, getShowsBySearch, getShow }
}
