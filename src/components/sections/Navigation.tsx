import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, useDisclosure } from '@nextui-org/react'

import { FacebookIcon, InstagramIcon, ShoppingCartIcon, WhatsAppIcon } from '../common/Icons'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { LOGO_DARK, LOGO_LIGHT } from '../../consts'
import ThemeSwitcher from '../common/ThemeSwitcher'
import Cart from '../menu/Cart'

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

  return (
    <>
      <Navbar isBlurred={true} isBordered={true}>
        <NavbarContent className="md:hidden" justify="start">
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarContent className="md:hidden pr-3" justify="center">
          <NavbarBrand>
            <img
              className="h-10 w-auto pointer-events-none"
              src={logo}
            />
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden md:flex" justify='start'>
          <NavbarBrand>
            <img
              className="h-10 w-auto pointer-events-none"
              src={logo}
            />
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden md:flex gap-4 md:pl-4" justify="center">
          <NavbarItem>
            <Link href="#" aria-current="page" color="warning">
              Menú
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Contáctanos
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Acerca de
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end" className='md:hidden'>
          <NavbarItem>
            <Button isIconOnly color="primary" variant="flat" onPress={onOpen}>
              <ShoppingCartIcon />
            </Button>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end" className='hidden md:flex'>
          <NavbarItem className='space-x-1'>
            <Button
              isIconOnly
              as={Link}
              variant='light'
              href='https://www.instagram.com/elchiquihuitl/'
              target='_blank'
            >
              <InstagramIcon />
            </Button>

            <Button
              isIconOnly
              as={Link}
              variant='light'
              href='https://www.facebook.com/elchiquihuitl'
              target='_blank'
            >
              <FacebookIcon />
            </Button>

            <Button
              isIconOnly
              as={Link}
              variant='light'
              href='https://wa.me/525515755550'
              target='_blank'
            >
              <WhatsAppIcon />
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button color="primary" variant="flat">
              Login
            </Button>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                color={'foreground'}
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
          <NavbarItem className='absolute bottom-0 right-0 m-4'>
            <ThemeSwitcher />
          </NavbarItem>
        </NavbarMenu>
      </Navbar>
      <Cart
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </>
  )
}

export default Navigation
