import { Toaster } from 'sonner'

import Footer from './components/sections/Footer'
import SearchInput from './components/SearchInput'
import Menu from './components/menu/Menu'
import Navigation from './components/sections/Navigation'
import Slider from './components/common/Slider'
import { useAppSelector } from './hooks/store'
import ThemeSwitcher from './components/common/ThemeSwitcher'

const sliderImages = [
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3099&q=80',
  'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2097&q=80',
  'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3269&q=80',
  'https://images.unsplash.com/photo-1596649299486-4cdea56fd59d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80',
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3099&q=80',
  'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2097&q=80'

]

function App() {
  const cartItems = useAppSelector((state) => state.cartItems)

  return (
    <>
      <Navigation />
      <Slider
        images={sliderImages}
        time={8000}
      />
      <Menu />
      {/* <div className="p-6">
        <button
          className='py-4 w-full rounded-xl border hover:border-citron bg-citron text-white text-center font-semibold text-lg focus:outline-none hover:bg-white hover:text-citron transition duration-300'
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
          <div className='py-2 flex flex-col text-right'>
            {
              cartItems.map((item) => (
                <div
                  key={'cart-item-' + item.id}
                  className='py-2 border-b border-t border-dashed'
                >
                  <div
                    className='flex justify-between'
                  >
                    <span>
                      {item.name}
                    </span>
                    <span>
                      x {item.quantity}
                    </span>
                  </div>
                  <span>
                    {(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
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
       */}
      <Footer />
      <ThemeSwitcher />
      <Toaster richColors />
    </>
  )
}

export default App
