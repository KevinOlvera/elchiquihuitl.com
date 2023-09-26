import { useEffect, useState } from 'react'
import range from 'lodash/range'

import { ChevronLeftIcon, ChevronRightIcon, PauseCircleIcon, PlayCircleIcon } from './Icons'

// FIXME: The transition of the ChevronLeftIcon and ChevronRightIcon is not working properly
// PENDING: Add a prop to change the size of the slider

interface SliderProps {
  images: string[]
  time?: number | 5000
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

  const [touched, setTouched] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        prevSlide()
      } else if (event.key === 'ArrowRight') {
        nextSlide()
      }
    }

    const handleTouchStart = (event: TouchEvent) => {
      const x = event.touches[0].clientX
      const y = event.touches[0].clientY

      const handleTouchMove = (event: TouchEvent) => {
        const xMove = event.touches[0].clientX
        const yMove = event.touches[0].clientY

        if (Math.abs(x - xMove) > Math.abs(y - yMove)) {
          if (xMove > x) {
            prevSlide()
          } else {
            nextSlide()
          }
        }

        window.removeEventListener('touchmove', handleTouchMove)
      }

      window.addEventListener('touchmove', handleTouchMove)
    }

    window.addEventListener('keydown', handleKeyDown)
    if (touched) {
      window.addEventListener('touchstart', handleTouchStart)
      setTouched(false)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('touchstart', handleTouchStart)
    }
  }, [currentImage, touched])

  const [timer, setTimer] = useState(true)

  const handleTimer = () => {
    setTimer(!timer)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!timer) return
      nextSlide()
    }, props.time)

    return () => { clearInterval(interval) }
  }, [currentImage, timer])

  return (
    <>
      {touched ? <>End</> : <>Start</>}
      <div className="w-full p-4">
        <div className="max-w-screen-xl mx-auto relative overflow-hidden">
          <div
            className="relative h-[40vh] lg:h-[80vh] bg-black bg-opacity-30 rounded-xl overflow-hidden"
            onTouchStart={() => { setTouched(true) }}
          >

            {
              props.images.map((image, index) => (
                <img
                  key={'slider-image-' + index}
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
              <ChevronLeftIcon />
            </button>

            <button
              onClick={() => { nextSlide() }}
              className="absolute inset-y-0 right-0 z-10 px-4 py-6 text-white bg-gradient-to-l from-black/10 to-transparent hover:from-black/20 hover:to-transparent focus:outline-none"
            >
              <ChevronRightIcon />
            </button>

            <div className="absolute inset-x-0 bottom-0 flex justify-center items-center space-x-2 m-4">
              <button
                className='text-gray-100 transition duration-500 ease-in-out p-0 m-0 focus:outline-none opacity-50 hover:opacity-100 hover:scale-110 transform'
                onClick={() => { handleTimer() }}
              >
                {!timer ? <PlayCircleIcon className='w-5 h-5' /> : <PauseCircleIcon className='w-5 h-5' />}
              </button>
              {range(props.images.length).map((index) => (
                <button
                  key={index}
                  className="w-6 h-1 bg-gray-100 rounded transition duration-500 ease-in-out"
                  onClick={() => { goToSlide(index) }}
                  style={{
                    opacity: currentImage === index ? 1 : 0.5
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default Slider
