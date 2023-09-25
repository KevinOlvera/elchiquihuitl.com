import { useState } from 'react'
import { Bars3 } from './Icons'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleNavbar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <nav className="p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="lg:flex space-x-4">
            {/* <img
                            className="h-10 w-auto"
                            src="https://picsur.kovin.dev/i/d31faddd-34ba-4536-9ac1-87d917caae6b.png"
                            alt="menuOnline.com"
                        /> */}
            <img
              className="h-10 w-auto"
              src="https://picsur.kovin.dev/i/48b347a9-6d78-43b8-80c1-b90546b1c9f3.png"
              alt="menuOnline.com"
            />
            <span className="text-2xl font-bold text-saffron-400 font-outline-1">menuOnline.com</span>
          </div>
          <div className="lg:hidden">
            <button onClick={toggleNavbar}>
              <Bars3 />
            </button>
          </div>
          <div className={`lg:flex ${isOpen ? 'block' : 'hidden'}`}>
            <ul className="lg:flex space-x-4">
              <li>
                <a href="">Home</a>
              </li>
              <li>
                <a href="">About Us</a>
              </li>
              <li>
                <a href="">Products</a>
              </li>
              <li>
                <a href="">Pricing</a>
              </li>
              <li>
                <a href="">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="lg:flex space-x-4">
            <button className="bg-white text-saffron-600 hover:bg-saffron-600 text-sm font-semibold px-4 py-2 rounded-xl hover:text-white hover:shadow-lg transition duration-300">
              Login
            </button>
            <button className="bg-saffron-600 text-white hover:bg-white border border-white text-sm font-semibold px-4 py-2 rounded-xl hover:text-saffron-600 hover:border-saffron-600 hover:shadow-lg transition duration-300">
              Register
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
