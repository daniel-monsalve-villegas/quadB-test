import { useRef } from 'react'

const YesShows = ({ shows }) => {
  let scrl = useRef(null)

  const slide = (shift) => {
    scrl.current.scrollLeft += shift
  }

  return (
    <>
      <div className='container'>
        <ul className='shows snaps-inline' ref={scrl}>
          {shows.map((show) => (
            <li key={show.id} className='show'>
              <img className='img-show' src={show.poster} alt={show.title} />
            </li>
          ))}
        </ul>
      </div>
      <div className='btn-container'>
        <button onClick={() => slide(-400)} className='btn btn-left'>
          <svg
            fill='#000'
            width='100%'
            height='100%'
            viewBox='0 0 32.00 32.00'
            xmlns='http://www.w3.org/2000/svg'
            stroke='#000'
            strokeWidth='0.8320000000000001'>
            <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
            <g
              id='SVGRepo_tracerCarrier'
              strokeLinecap='round'
              strokeLinejoin='round'></g>
            <g id='SVGRepo_iconCarrier'>
              <path d='M14.19 16.005l7.869 7.868-2.129 2.129-9.996-9.997L19.937 6.002l2.127 2.129z'></path>
            </g>
          </svg>
        </button>
        <button onClick={() => slide(+400)} className='btn btn-right'>
          <svg
            fill='#000'
            width='100%'
            height='100%'
            viewBox='0 0 32.00 32.00'
            xmlns='http://www.w3.org/2000/svg'
            stroke='#000'
            strokeWidth='0.8320000000000001'
            transform='matrix(-1, 0, 0, 1, 0, 0)'>
            <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
            <g
              id='SVGRepo_tracerCarrier'
              strokeLinecap='round'
              strokeLinejoin='round'></g>
            <g id='SVGRepo_iconCarrier'>
              <path d='M14.19 16.005l7.869 7.868-2.129 2.129-9.996-9.997L19.937 6.002l2.127 2.129z'></path>
            </g>
          </svg>
        </button>
      </div>
    </>
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
