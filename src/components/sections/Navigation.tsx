import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenuItem, NavbarMenu } from '@nextui-org/react'

import { ShoppingCartIcon } from '../common/Icons'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { LOGO_DARK, LOGO_LIGHT } from '../../consts'
import ThemeSwitcher from '../common/ThemeSwitcher'

function Navigation() {
  const { theme } = useTheme()
  const [logo, setLogo] = useState(LOGO_LIGHT)

  const menuItems = [
    'Registrarse',
    'Iniciar Sesión',
    'Acerca de',
    'Contáctanos',
    'Preguntas Frecuentes',
    'Información Alergénica',
    'Términos de Servicio',
    'Términos de Oferta',
    'Aviso de Privacidad',
    'Log Out'
  ]

  useEffect(() => {
    if (theme === 'dark') {
      setLogo(LOGO_DARK)
    } else {
      setLogo(LOGO_LIGHT)
    }
  }, [theme])

  return (
    <>
      <Navbar>
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

        <NavbarContent className="hidden md:flex">
          <NavbarBrand>
            <img
              className="h-10 w-auto pointer-events-none"
              src={logo}
            />
          </NavbarBrand>
        </NavbarContent>

        {/* <NavbarContent className="hidden md:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page" color="warning">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Integrations
            </Link>
          </NavbarItem>
        </NavbarContent> */}

        <NavbarContent justify="end">
          <NavbarItem>
            <Button isIconOnly color="primary" variant="flat">
              <ShoppingCartIcon />
            </Button>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          <NavbarItem>Cambiar Modo&nbsp;
            <ThemeSwitcher />
          </NavbarItem>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                color={index === 2 ? 'warning' : index === menuItems.length - 1 ? 'danger' : 'foreground'}
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </>
  )
}

export default Navigation
