import { Outlet } from 'react-router-dom'

import Footer from '../../components/home/Footer'
import Navigation from '../../components/home/Navigation'

function HomeTemplate() {
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  )
}

export default HomeTemplate
