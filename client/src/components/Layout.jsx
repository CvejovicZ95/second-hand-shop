import {Header} from "./Header";
import {Listings} from "./Listings";
import { Outlet } from 'react-router-dom';
import {Footer} from "./Footer";

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