import { useEffect, useState } from 'react'

import { NavLink, useNavigate } from 'react-router-dom'
import { useTheme } from 'next-themes'

import { useAuthenticationActions } from '../../hooks/useAuthenticationActions'
import { LOGO_DARK, LOGO_LIGHT } from '../../consts'

import { ArrowLeftOnRectangleIcon, CircleStackIcon, ClipBoardDocumentCheckIcon, ClipBoardDocumentListIcon, Cog6ToothIcon, Square2x2Icon, TagIcon, UserIcon } from '../common/Icons'

function AsidePanel() {
  const { theme } = useTheme()
  const [logo, setLogo] = useState(LOGO_LIGHT)

  useEffect(() => {
    if (theme === 'dark') {
      setLogo(LOGO_DARK)
    } else {
      setLogo(LOGO_LIGHT)
    }
  }, [theme])

  const navigate = useNavigate()

  const { setUnauthenticatedUser } = useAuthenticationActions()

  return (
    <aside
      className='flex flex-col items-center w-56 h-full fixed bg-gray-100'
    >
      <nav
        className='flex flex-col items-center w-full h-full'
      >
        <div className='p-4'>
          <img
            className="cursor-pointer w-40 object-contain"
            src={logo}
            onClick={() => { navigate('/') }}
          />
        </div>

        <div
          className='flex flex-col items-center w-full h-full gap-2 p-4'
        >
          <NavLink
            to={'/dashboard/'}
            className={({ isActive }) =>
              [
                isActive
                  ? 'w-full flex items-center justify-start gap-2 px-4 py-2 rounded-lg bg-citron-600 bg-opacity-20 text-citron-600 text-sm'
                  : 'w-full flex items-center justify-start gap-2 px-4 py-2 rounded-lg hover:bg-citron-600 hover:bg-opacity-20 hover:text-citron-600 transition text-sm'
              ].join(' ') }
          >
            <Square2x2Icon className='w-5 mt-[2px]'/> Dashboard
          </NavLink>
          <NavLink
            to={'/dashboard/users'}
            className={({ isActive }) =>
              [
                isActive
                  ? 'w-full flex items-center justify-start gap-2 px-4 py-2 rounded-lg bg-citron-600 bg-opacity-20 text-citron-600 text-sm'
                  : 'w-full flex items-center justify-start gap-2 px-4 py-2 rounded-lg hover:bg-citron-600 hover:bg-opacity-20 hover:text-citron-600 transition text-sm'
              ].join(' ') }
          >
            <UserIcon className='w-5 mt-[2px]'/> Usuarios
          </NavLink>
          <NavLink
            to={'/dashboard/categories'}
            className={({ isActive }) =>
              [
                isActive
                  ? 'w-full flex items-center justify-start gap-2 px-4 py-2 rounded-lg bg-citron-600 bg-opacity-20 text-citron-600 text-sm'
                  : 'w-full flex items-center justify-start gap-2 px-4 py-2 rounded-lg hover:bg-citron-600 hover:bg-opacity-20 hover:text-citron-600 transition text-sm'
              ].join(' ') }
          >
            <TagIcon className='w-5 mt-[2px]'/> Categorías
          </NavLink>
          <NavLink
            to={'/dashboard/products'}
            className={({ isActive }) =>
              [
                isActive
                  ? 'w-full flex items-center justify-start gap-2 px-4 py-2 rounded-lg bg-citron-600 bg-opacity-20 text-citron-600 text-sm'
                  : 'w-full flex items-center justify-start gap-2 px-4 py-2 rounded-lg hover:bg-citron-600 hover:bg-opacity-20 hover:text-citron-600 transition text-sm'
              ].join(' ') }
          >
            <CircleStackIcon className='w-5 mt-[2px]'/> Productos
          </NavLink>
          <NavLink
            to={'/dashboard/orders'}
            className={({ isActive }) =>
              [
                isActive
                  ? 'w-full flex items-center justify-start gap-2 px-4 py-2 rounded-lg bg-citron-600 bg-opacity-20 text-citron-600 text-sm'
                  : 'w-full flex items-center justify-start gap-2 px-4 py-2 rounded-lg hover:bg-citron-600 hover:bg-opacity-20 hover:text-citron-600 transition text-sm'
              ].join(' ') }
          >
            <ClipBoardDocumentListIcon className='w-5 mt-[2px]'/> Ordenes
          </NavLink>
          <NavLink
            to={'/dashboard/sales'}
            className={({ isActive }) =>
              [
                isActive
                  ? 'w-full flex items-center justify-start gap-2 px-4 py-2 rounded-lg bg-citron-600 bg-opacity-20 text-citron-600 text-sm'
                  : 'w-full flex items-center justify-start gap-2 px-4 py-2 rounded-lg hover:bg-citron-600 hover:bg-opacity-20 hover:text-citron-600 transition text-sm'
              ].join(' ') }
          >
            <ClipBoardDocumentCheckIcon className='w-5 mt-[2px]'/> Ventas
          </NavLink>
        </div>

        <div
          className='flex flex-col items-center w-full justify-end gap-2 p-4'
        >
          <NavLink
            to={'/dashboard/settings'}
            className={({ isActive }) =>
              [
                isActive
                  ? 'w-full flex items-center justify-start gap-2 px-4 py-2 rounded-lg bg-citron-600 bg-opacity-20 text-citron-600 text-sm'
                  : 'w-full flex items-center justify-start gap-2 px-4 py-2 rounded-lg hover:bg-citron-600 hover:bg-opacity-20 hover:text-citron-600 transition text-sm'
              ].join(' ') }
          >
            <Cog6ToothIcon className='w-5 mt-[2px]'/> Configuración
          </NavLink>
          <NavLink
            to={'/'}
            onClick={setUnauthenticatedUser}
            className={({ isActive }) =>
              [
                isActive
                  ? 'w-full flex items-center justify-start gap-2 px-4 py-2 rounded-lg bg-cerise-red-600 bg-opacity-20 text-cerise-red-600 text-sm'
                  : 'w-full flex items-center justify-start gap-2 px-4 py-2 rounded-lg hover:bg-cerise-red-600 hover:bg-opacity-20 hover:text-cerise-red-600 transition text-sm'
              ].join(' ') }
          >
            <ArrowLeftOnRectangleIcon className='w-5 mt-[2px]'/> Cerrar Sesión
          </NavLink>
        </div>
      </nav>
    </aside>
  )
}

export default AsidePanel
