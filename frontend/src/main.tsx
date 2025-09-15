import './index.css'
import App from './App.tsx'
import { createRoot } from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import "@mantine/core/styles.css"
import '@mantine/dates/styles.css'
import '@mantine/dropzone/styles.css'

createRoot(document.getElementById('root')!).render(
  <MantineProvider defaultColorScheme="dark">
    <App />
  </MantineProvider>,
)
