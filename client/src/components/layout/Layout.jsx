import {Header} from "../layout/header/Header.jsx"
import {Listings} from "../layout/listings/Listings.jsx"
import { Outlet } from 'react-router-dom';
import {Footer} from "../layout/footer/Footer.jsx"

const Layout=()=>{
  return(
    <div className="App">
      <Header/>
      <Listings/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export {Layout}