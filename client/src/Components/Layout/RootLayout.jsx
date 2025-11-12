import React from 'react'
import Header from '../Header'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import Footer from '../Footer'
import ServicesTag from '../ServicesTag'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { persistor, store } from '../../Redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'

const RootLayout = () => {
  return (
    
    <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
          <Header/>
    <ScrollRestoration/>
    <Outlet/>
    <ServicesTag/>
    <Footer/>

     <Toaster
    position="bottom-right"
    toastOptions = {{
      style: {
        background: "#000000",
        color:"#ffffff"
      }
    }}
    />
     </PersistGate>
    </Provider>
  )
}

export default RootLayout