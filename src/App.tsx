import { useEffect } from 'react'

import { Route, Routes } from 'react-router-dom'
import { Toaster, toast } from 'sonner'
import { Analytics } from '@vercel/analytics/react'

import Home from './components/home/Home'
import Error from './components/common/Error'
import Dashboard from './components/dashboard/Dashboard'
import Menu from './components/home/Menu'
import About from './components/home/About'
import Contact from './components/home/Contact'
import Order from './components/home/Order'
import UsersBoard from './components/dashboard/users/UsersBoard'
import HomeTemplate from './routes/Home/HomeTemplate'
import DashboardTemplate from './routes/Dashboard/DashboardTemplate'
import { useAppSelector } from './hooks/store'
import { useAuthenticationActions } from './hooks/useAuthenticationActions'
import { InformationCircleIcon } from './components/common/Icons'
import { type AuthenticatedUser } from './models/users'
import CategoriesBoard from './components/dashboard/categories/CategoriesBoard'
import ProductsBoard from './components/dashboard/products/ProductsBoard'
import ProtectedRoute from './routes/ProtectedRoute'

function App() {
  const authentication: AuthenticatedUser = useAppSelector((state) => state.authentication)

  const { setUnauthenticatedUser } = useAuthenticationActions()

  useEffect(() => {
    const interval = setInterval(() => {
      console.group('[App][useEffect][setInterval]]')
      if (authentication.user === null) {
        console.log('Authentication User is null')
        setUnauthenticatedUser()
        console.groupEnd()
        return
      }

      console.log(`Authentication: ${authentication.user.email}`)

      if (authentication.exp === null) {
        console.log('Authentication Exp is null')
        console.groupEnd()
        return
      }

      const now = new Date()
      const exp = new Date(authentication.exp * 1000)
      const diff = exp.getTime() - now.getTime()
      const humanReadable = new Date(diff).toISOString().substr(11, 8)

      console.log(`Time left to expire: ${humanReadable}`)

      if (diff < 5 * 60 * 1000) {
        console.log('Time left to expire is less than 5 minutes')

        toast(
          '¡Tu sesión está a punto de expirar!',
          {
            description: 'Tu sesión se terminará en 5 minutos.',
            action: {
              label: 'Renovar',
              onClick: () => {
                console.log('Renovando Sesión')
                // setUnauthenticatedUser
              }
            },
            icon: <InformationCircleIcon className='w-5'/>
          }
        )

        if (diff < 0) {
          console.log('Time left to expire is less than 0 minutes')
          console.log('Logging out')
          setUnauthenticatedUser()
        }
      }

      console.groupEnd()
    }, 60 * 1000)
    return () => { clearInterval(interval) }
  }, [authentication])

  return (
    <>
      <Routes>
        <Route path='/' element={<HomeTemplate/>}>
          <Route index element={<Home/>} />
          <Route path='order' element={<Order/>} />
          <Route path='menu' element={<Menu/>} />
          <Route path='contact' element={<Contact/>} />
          <Route path='about' element={<About/>} />
          <Route path='*' element={<Error/>} />
        </Route>

        <Route path='/dashboard' element={<ProtectedRoute user={authentication}><DashboardTemplate/></ProtectedRoute>}>
          <Route index element={<Dashboard/>} />
          <Route path='users' element={<UsersBoard/>} />
          <Route path='categories' element={<CategoriesBoard/>} />
          <Route path='products' element={<ProductsBoard/>} />
          <Route path='*' element={<Error/>} />
        </Route>

        <Route path='*' element={<Error/>} />
      </Routes>
      <Toaster richColors />
      <Analytics />
    </>
  )
}

export default App
