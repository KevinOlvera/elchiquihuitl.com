import { Switch } from '@nextui-org/react'
import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon } from './Icons'

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  const handleTheme = () => {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  return (
    <Switch
      defaultSelected
      size="sm"
      color="primary"
      thumbIcon={
        theme !== 'dark'
          ? <SunIcon className='w-4 h-4' />
          : <MoonIcon className='w-4 h-4' />
      }
      onClick={() => { handleTheme() }}
    >
    </Switch>
  )
}

export default ThemeSwitcher
