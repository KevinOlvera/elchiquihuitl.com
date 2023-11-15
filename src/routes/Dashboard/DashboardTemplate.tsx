import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../../components/dashboard/Footer'
import AsidePanel from '../../components/dashboard/AsidePanel'
import { Badge, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from '@nextui-org/react'
import { useAppSelector } from '../../hooks/store'
import { useAuthenticationActions } from '../../hooks/useAuthenticationActions'
import { BellIcon, LifeBuoyIcon, UserIcon } from '../../components/common/Icons'
import { type AuthenticatedUser } from '../../models/users'

function DashboardTemplate() {
  const authentication: AuthenticatedUser = useAppSelector((state) => state.authentication)

  const navigate = useNavigate()

  const handleNavigateClick = (path: string) => {
    navigate(path)
  }

  const { setUnauthenticatedUser } = useAuthenticationActions()

  return (
    <div className='flex flex-row w-full h-screen'>
      <AsidePanel />
      <main
        className='flex flex-col w-full pl-56'
      >
        <div
          className='flex w-full h-20 px-6 py-4 gap-4 justify-center items-center'
        >
          <h1 className='text-3xl font-bold text-gray-700 mr-auto'>Buenos días, <span>{authentication.user?.name}</span></h1>
          <Button
            radius="full"
            isIconOnly
            aria-label="more than 99 notifications"
            variant="flat"
            size='md'
            color='warning'
          >
            <LifeBuoyIcon className='w-5 mt-[2px]'/>
          </Button>
          <Badge
            content=""
            shape="circle"
            color="danger"
          >
            <Button
              radius="full"
              isIconOnly
              aria-label="more than 99 notifications"
              variant="flat"
              size='md'
            >
              <BellIcon className='w-5 mt-[2px]'/>
            </Button>
          </Badge>
          <Dropdown>
            <DropdownTrigger>
              <User
                avatarProps={{
                  src: `https://unavatar.io/${authentication.user?.username}`,
                  fallback: (<UserIcon className='w-5'/>),
                  showFallback: true
                }}
                description={authentication.user?.email}
                name={authentication.user?.username}
                className='cursor-pointer hover:text-primary transition'
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="dashboard" onPress={() => { handleNavigateClick('/') }}>
                Inicio
              </DropdownItem>
              <DropdownItem key="settings">Configuración</DropdownItem>
              <DropdownItem key="help_and_feedback">Ayuda</DropdownItem>
              <DropdownItem key="logout" color="danger" onPress={setUnauthenticatedUser}>
                Cerrar Sesión
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <Outlet />
        <Footer/>
      </main>
    </div>
  )
}

export default DashboardTemplate
