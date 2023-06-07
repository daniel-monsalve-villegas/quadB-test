const TV_URL = 'https://api.tvmaze.com/'

export const searchShows = async ({ search }) => {
  if (search === '') return null

  try {
    const response = await fetch(`${TV_URL}search/shows?q=${search}`)
    const json = await response.json()
    const shows = json.map((item) => item)

    return shows?.map((show) => ({
      id: show.show.id,
      title: show.show.name,
      poster: show.show.image.medium,
    }))
  } catch (error) {
    throw new Error('Error searching show')
  }
}

export const topMovies = async () => {
  try {
    const response = await fetch(`${TV_URL}shows?page=0`)
    const json = await response.json()
    const shows = json.slice(0, 5).map((item) => item)
    return shows?.map((show) => ({
      id: show.show.id,
      title: show.show.name,
      year: show.show.premiered,
      image: show.show.image.original,
    }))
  } catch (error) {
    throw new Error('Error loading top shows')
  }
}

export const seeShow = async ({ id }) => {
  try {
    const response = await fetch(`${TV_URL}shows/${id}`)
    const json = await response.json()
    const showMapped = {
      name: json.name,
      language: json.language,
      image: json.image.original,
      rating: json.rating.average,
      summary: json.summary,
      genre: json.genres,
      country: json.network.country.name,
      company: json.network.name,
      schedule: json.schedule,
    }
    return showMapped
  } catch (error) {
    throw new Error('Error loading show')
  }
}
