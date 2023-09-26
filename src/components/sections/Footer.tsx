import { HeartIcon } from '../common/Icons'

function Footer() {
  return (
    <footer className="p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <span className="text-sm text-gray-400">
            © {new Date().getFullYear()} EL CHIQUIHUITL
          </span>
        </div>
        <div className="flex space-x-4">
          <span className="flex text-sm text-gray-400 items-center">
            Made with&nbsp;<HeartIcon className='w-4 h-4' />&nbsp;by&nbsp;<a href="https://kevinolvera.com" target="_blank" className="text-pistachio-600 text-sm">Kevin Olvera</a>
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
