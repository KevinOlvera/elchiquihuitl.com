import { useEffect, useState } from 'react'
import range from 'lodash/range'

import { ArrowLeft, ArrowRight } from './Icons'

interface SliderProps {
  images: string[]
}

function Slider(props: SliderProps) {
  const [currentImage, setCurrentImage] = useState(0)

  const prevSlide = () => {
    setCurrentImage(currentImage === 0 ? props.images.length - 1 : currentImage - 1)
  }

  const nextSlide = () => {
    setCurrentImage(currentImage === props.images.length - 1 ? 0 : currentImage + 1)
  }

  const goToSlide = (index: number) => {
    setCurrentImage(index)
  }

  /* const size = 'height=576&width=1024' */
  const size = 'height=900&width=1600'

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        prevSlide()
      } else if (event.key === 'ArrowRight') {
        nextSlide()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => { window.removeEventListener('keydown', handleKeyDown) }
  }, [currentImage])

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => { clearInterval(interval) }
  }, [currentImage])

  return (
    <>
      <div className="w-full p-4">
        <div className="max-w-screen-xl mx-auto relative overflow-hidden">
          <div className="relative h-[40vh] lg:h-[80vh] bg-black bg-opacity-30 rounded-xl overflow-hidden">

            {
              props.images.map((image, index) => (
                <img
                  key={index}
                  className="absolute inset-0 w-full h-full object-cover object-center transform duration-300 ease-in-out"
                  src={image + '?' + size}
                  style={{
                    opacity: currentImage === index ? 1 : 0,
                    transitionProperty: 'opacity',
                    pointerEvents: 'none'
                  }}
                />
              ))
            }

            <button
              onClick={() => { prevSlide() }}
              className="absolute inset-y-0 left-0 z-10 px-4 py-6 text-white bg-gradient-to-r from-black/10 to-transparent hover:from-black/20 hover:to-transparent focus:outline-none"
            >
              <ArrowLeft />
            </button>

            <button
              onClick={() => { nextSlide() }}
              className="absolute inset-y-0 right-0 z-10 px-4 py-6 text-white bg-gradient-to-l from-black/10 to-transparent hover:from-black/20 hover:to-transparent focus:outline-none"
            >
              <ArrowRight />
            </button>

            <div className="absolute inset-x-0 bottom-0 flex justify-center space-x-2 m-4">
              {range(props.images.length).map((index) => (
                <span
                  key={index}
                  className="w-6 h-1 bg-gray-100 rounded cursor-pointer transition duration-500 ease-in-out"
                  onClick={() => { goToSlide(index) }}
                  style={{
                    opacity: currentImage === index ? 1 : 0.5
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Slider
