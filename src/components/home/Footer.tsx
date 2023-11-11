import { Button, Link } from '@nextui-org/react'
import { FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon, YouTubeIcon } from '../common/Icons'

function Footer() {
  return (
    <footer className="px-4 py-12 flex flex-col space-y-4">
      <div className='flex space-x-4 justify-center pb-4'>
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
          href='https://www.youtube.com/channel/elchiquihuitl'
          target='_blank'
          className='hidden'
        >
          <YouTubeIcon />
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
        <Button
          isIconOnly
          as={Link}
          variant='light'
          href='https://www.tiktok.com/@elchiquihuitl'
          target='_blank'
          className='hidden'
        >
          <TikTokIcon />
        </Button>
      </div>
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 pb-4">
        <div className="mb-4 sm:mb-0">
          <ul className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400">
            <li><a href="#">Términos de Servicio</a></li>
            <li><a href="#">Términos de Oferta</a></li>
            <li><a href="#">Aviso de Privacidad</a></li>
            <li><a href="#">Información Alergénica</a></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <span className="text-sm text-gray-400">
            © {new Date().getFullYear()} EL CHIQUIHUITL
          </span>
        </div>
        <div className="flex space-x-4">
          <span className="flex text-sm text-gray-400 items-center">
            {/* Made with&nbsp;<BurgerIcon className='w-3 h-3 text-gray-400' />&nbsp;by&nbsp;<a href="https://kevinolvera.com" target="_blank" className="text-citron text-sm">Kevin Olvera</a> */}
            powered by&nbsp;<a href="https://kevinolvera.com" target="_blank" className="text-citron text-sm">kevinolvera.com</a>
          </span>
        </div>
      </div>
    </footer >
  )
}

export default Footer
