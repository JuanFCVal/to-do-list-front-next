import '@/styles/globals.css'
import { ThemeProvider } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import type { AppProps } from 'next/app'
import { darkBasicTheme } from 'themes/dark-theme'
import { TaskProvider } from '../context/task/TaskProvider'
import { UIProvider } from '../context/ui/UIProvider'

// eslint-disable-next-line @typescript-eslint/naming-convention
const App = ({ Component, pageProps }: AppProps) => (
  <>
    <UIProvider>
      <TaskProvider>
        <ThemeProvider theme={darkBasicTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </TaskProvider>
    </UIProvider>
  </>
)

export default App
