const TV_URL = 'https://api.tvmaze.com/search/shows?q='

export const searchShows = async ({ search }) => {
  if (search === '') return null

  try {
    const response = await fetch(`${TV_URL}${search}`)
    const json = await response.json()
    const shows = json.map((item) => item)

    return shows?.map((show) => ({
      id: show.show.id,
      title: show.show.name,
      year: show.show.premiered,
      image: show.show.image.original,
    }))
  } catch (error) {
    throw new Error('Error searching movies')
  }
}
