import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import { Analytics } from '@vercel/analytics/react'

import Navigation from './components/sections/Navigation'
import Footer from './components/sections/Footer'
import Home from './pages/Home'
import Error from './pages/Error'

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='*' element={<Error/>} />
      </Routes>
      <Footer />
      <Toaster richColors />
      <Analytics />
    </>
  )
}

export default App
