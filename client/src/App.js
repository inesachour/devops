import React from 'react';
import { Box } from '@chakra-ui/react';
import NavbarComponent from './Components/NavbarComponent';
import Dashboard from './Components/Dashboard';
const App = () => {
  return (
    <>
    <NavbarComponent/>
    <Box display='flex' justifyContent='center' alignItems='center' mt='10'>
      <Dashboard/>
    </Box>
    </>
  )
}

export default App