function Footer() {
  return (
    <footer className="px-8 py-8 flex flex-col space-y-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <span className="text-sm text-gray-400">
            © {new Date().getFullYear()} EL CHIQUIHUITL
          </span>
        </div>
        <div className="flex space-x-4">
          <span className="flex text-sm text-gray-400 items-center">
            powered by&nbsp;<a href="https://kevinolvera.com" target="_blank" className="text-citron text-sm">kevinolvera.com</a>
          </span>
        </div>
      </div>
    </footer >
  )
}

export default Footer
