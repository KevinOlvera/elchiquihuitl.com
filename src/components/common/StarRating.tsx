import { useState } from 'react'
import { StartIcon } from './Icons'

interface StarRatingProps {
  rating: number
}

function StarRating (props: StarRatingProps) {
  const [rating] = useState(Math.round(props.rating))

  const stars = Array.from({ length: rating }, (_, index) => (
    <StartIcon key={index} className='w-4 h-4 text-warning-500' />
  ))

  return (
    <div
      className='flex flex-row items-center'
    >
      {stars}
    </div>
  )
}

export default StarRating
