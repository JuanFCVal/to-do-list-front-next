import { AppBar, Toolbar, Typography } from '@mui/material'

// eslint-disable-next-line prettier/prettier
export const Navbar = () => (
  // eslint-disable-next-line prettier/prettier
  <AppBar position="sticky" elevation={1}>
    <Toolbar>
      <Typography variant="h5">To Do List</Typography>
    </Toolbar>
  </AppBar>
)
