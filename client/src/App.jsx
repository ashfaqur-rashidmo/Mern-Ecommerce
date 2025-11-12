import React from 'react'
import Banner from './Components/Banner'
import Sale from './Components/Sale'
import Container from './Components/Container'
import NewArrival from './Components/NewArrival'
import PrivateRoute from './Components/PrivateRoute'
import { AuthProvider } from './Contexts/AuthProvider'


const App = () => {
  return (
      
    <main>
      <Banner/>
      <Container className="py-5 md:py-10">
        <Sale/>
        {/* <PrivateRoute> */}
          <NewArrival/>
        {/* </PrivateRoute> */}
        
      </Container>
    </main>
   
  )
}

export default App