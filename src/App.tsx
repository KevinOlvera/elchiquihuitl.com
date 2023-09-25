import { Toaster } from 'sonner'

import CategoriesPanel from './components/CategoriesPanel'
import { Heart, Search, ShoppingCart } from './components/Icons'
import Input from './components/Input'
import Slider from './components/Slider'
import { useAppSelector } from './hooks/store'

function App() {
  const cartItems = useAppSelector((state) => state.cartItems)

  return (
    <>
      <nav className="p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="lg:flex space-x-4">
            <img
              className="h-10 w-auto"
              src="https://picsur.kovin.dev/i/c2792569-07c4-40fe-9698-89b112548be0.png"
            />
          </div>
          <div className="lg:flex space-x-4 hidden">
            <button className="bg-pistachio-600 text-white hover:bg-white border border-white text-sm font-semibold px-4 py-2 rounded-xl hover:text-pistachio-600 hover:border-pistachio-600 hover:shadow-lg transition duration-300">
              Login
            </button>
          </div>
          <div className="lg:hidden space-x-4">
            <button className="bg-white text-pistachio-600 hover:bg-pistachio-600 border border-pistachio-600 text-sm font-semibold px-4 py-2 rounded-xl hover:text-white hover:border-pistachio-600 hover:shadow-lg transition duration-300">
              <ShoppingCart />
            </button>
          </div>
        </div>
      </nav>
      <CategoriesPanel />
      <div className="p-6">
        <button
          className='py-4 w-full rounded-xl border hover:border-pistachio-600 bg-pistachio-600 text-white text-center font-semibold text-lg focus:outline-none hover:bg-white hover:text-pistachio-600 transition duration-300'
        >
          Ver Carrito
        </button>
      </div>
      <div className='p-6 flex flex-col'>
        <div
          className='border rounded-xl p-4 space-y-2'
        >
          <span
            className='text-lg font-semibold'
          >
            Resumen de Orden
          </span>
          <hr />
          <div className='py-2 flex flex-col'>
            {
              cartItems.map((item) => (
                <>
                  <div
                    key={'cart-item-' + item.id}
                    className='flex justify-between'
                  >
                    <span>
                      {item.name}
                    </span>
                    <span>
                      x {item.quantity}
                    </span>
                  </div>
                  <span
                    className='text-right'
                  >
                    {(item.price * item.quantity).toFixed(2)}
                  </span>
                </>
              ))
            }
          </div>
          <hr />
          <span
            className='text-right font-semibold'
          >
            Total {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}
          </span>
        </div>
      </div>
      <footer className="p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex space-x-4">
            <span className="text-sm text-gray-400">
              © {new Date().getFullYear()} Texas Burger
            </span>
          </div>
          <div className="flex space-x-4">
            <span className="flex text-sm text-gray-400 items-center">
              Made with&nbsp;<Heart />&nbsp;by&nbsp;<a href="https://kevinolvera.com" target="_blank" className="text-pistachio-600 text-sm">Kevin Olvera</a>
            </span>
          </div>
        </div>
      </footer>
      <Toaster richColors />
    </>
  )
}

export default App
