import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { Provider } from 'react-redux'

import { store } from '../../store'

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute='class' defaultTheme='dark'>
        <Provider store={store}>
          {children}
        </Provider>
      </NextThemesProvider>
    </NextUIProvider>
  )
}

export default Providers