import { Box } from '@mui/material'
import Head from 'next/head'
import { FC } from 'react'
import { Navbar } from '../ui/Navbar'

interface Props {
  children: React.ReactNode
  title?: string
}
const MainLayout: FC<Props> = ({ children, title = 'To Do App' }) => (
  <>
    <Box sx={{ flexFlow: 1 }}>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar></Navbar>
      <main>{children}</main>
    </Box>
  </>
)

export default MainLayout
