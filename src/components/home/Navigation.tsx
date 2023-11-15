import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, useDisclosure, Modal, ModalContent, ModalBody, Dropdown, DropdownTrigger, Avatar, DropdownMenu, DropdownItem, Link as NUILink } from '@nextui-org/react'

import { Link, NavLink, useNavigate } from 'react-router-dom'

import { FacebookIcon, InstagramIcon, WhatsAppIcon } from '../common/Icons'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { LOGO_DARK, LOGO_LIGHT, mapStatusToColor } from '../../consts'
import ThemeSwitcher from '../common/ThemeSwitcher'
import LoginForm from '../authentication/LoginForm'
import { useAppSelector } from '../../hooks/store'
import { useAuthenticationActions } from '../../hooks/useAuthenticationActions'
import { type AuthenticatedUser } from '../../models/users'

function Navigation() {
  const { theme } = useTheme()
  const [logo, setLogo] = useState(LOGO_LIGHT)

  const menuItems = [
    /* 'Registrarse', */
    /* 'Iniciar Sesión', */
    'Acerca de',
    'Contáctanos'
    /* 'Preguntas Frecuentes', */
    /* 'Información Alergénica', */
    /* 'Términos de Servicio', */
    /* 'Términos de Oferta', */
    /* 'Aviso de Privacidad', */
    /* 'Log Out' */
  ]

  useEffect(() => {
    if (theme === 'dark') {
      setLogo(LOGO_DARK)
    } else {
      setLogo(LOGO_LIGHT)
    }
  }, [theme])

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const authentication: AuthenticatedUser = useAppSelector((state) => state.authentication)

  const { setUnauthenticatedUser } = useAuthenticationActions()

  const navigate = useNavigate()

  const handleNavigateClick = (path: string) => {
    navigate(path)
  }

  return (
    <>
      <Navbar isBlurred={true} isBordered={true}>
        <NavbarContent className="md:hidden" justify="start">
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarContent className="md:hidden pr-3" justify="center">
          <NavbarBrand>
            <Link to={'/'}>
              <img
                className="h-10 w-auto cursor-pointer"
                src={logo}
              />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden md:flex" justify='start'>
          <NavbarBrand>
            <Link to={'/'}>
              <img
                className="h-10 w-auto cursor-pointer"
                src={logo}
              />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden md:flex gap-4 md:pl-4" justify="center">
          <NavbarItem>
            <NavLink
              to={'/order'}
              className={({ isActive }) =>
                [
                  isActive ? 'text-primary' : ''
                ].join(' ')
              }
            >
              Pide Ahora
            </NavLink>
          </NavbarItem>
          <NavbarItem>
            <NavLink
              to={'/menu'}
              className={({ isActive }) =>
                [
                  isActive ? 'text-primary' : ''
                ].join(' ')
              }
            >
              Menú
            </NavLink>
          </NavbarItem>
          <NavbarItem>
            <NavLink
              to={'/contact'}
              className={({ isActive }) =>
                [
                  isActive ? 'text-primary' : ''
                ].join(' ')
              }
            >
              Contacto
            </NavLink>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">

          <NavbarItem className='space-x-1 hidden md:flex'>
            <Button
              isIconOnly
              as={NUILink}
              variant='light'
              href='https://www.instagram.com/elchiquihuitl/'
              target='_blank'
            >
              <InstagramIcon />
            </Button>
            <Button
              isIconOnly
              as={NUILink}
              variant='light'
              href='https://www.facebook.com/elchiquihuitl'
              target='_blank'
            >
              <FacebookIcon />
            </Button>
            <Button
              isIconOnly
              as={NUILink}
              variant='light'
              href='https://wa.me/525515755550'
              target='_blank'
            >
              <WhatsAppIcon />
            </Button>
          </NavbarItem>

          <NavbarItem>
            {authentication.user !== null
              ? (
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <Avatar
                      isBordered
                      as="button"
                      className="transition-transform text-green-700"
                      color={mapStatusToColor(authentication.user.status)}
                      name={authentication.user.name}
                      size="sm"
                      src={`https://unavatar.io/${authentication.user.username}`}
                      showFallback
                    />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2" textValue='user'>
                      <p className="font-semibold">Signed in as</p>
                      <p className="font-semibold">{authentication.user.name}</p>
                    </DropdownItem>
                    <DropdownItem key="dashboard" onPress={() => { handleNavigateClick('/dashboard/') }}>
                      Dashboard
                    </DropdownItem>
                    <DropdownItem key="settings">My Settings</DropdownItem>
                    <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                    <DropdownItem key="logout" color="danger" onPress={setUnauthenticatedUser}>
                      Log Out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              )
              : (
                <Button
                  color="primary"
                  variant="flat"
                  onPress={onOpen}
                >
                  Login
                </Button>
              )
            }
          </NavbarItem>

        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <NavLink
                className="w-full"
                to={`/${item.toLowerCase().replace(' ', '-')}`}
              >
                {item}
              </NavLink>
            </NavbarMenuItem>
          ))}
          <NavbarItem className='absolute bottom-0 right-0 m-4 hidden'>
            <ThemeSwitcher />
          </NavbarItem>
        </NavbarMenu>
      </Navbar>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className='py-6'>
                <LoginForm
                  onClose={onClose}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default Navigation
