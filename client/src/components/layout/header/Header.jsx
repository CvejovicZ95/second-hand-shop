import { Link } from "react-router-dom"
import { useAuthContext } from "../../../context/AuthContext.js"
import {Logo} from "../../Logo/Logo.jsx"
import {useLogout} from "../../../hooks/useLogout.js"
import "./Header.css";

const Header = () => {
  const {authUser}=useAuthContext()
  const {logoutHandler}=useLogout()

  let welcomeMessage = (
    <h1>Welcome! Find Your Perfect Match Here...</h1>
  );

  if (authUser) {
    welcomeMessage = (
      <h1>{`Welcome back ${authUser.username}! Find Your Perfect Match Here...`}</h1>
    );
  }
  
  return (
    <header className="header">
      <h1>Discover Treasures at our "Second Hand" Emporium</h1>
      <div className="header-div">
        <Logo/>
        {welcomeMessage}
        {!authUser ?<Link to='/login'><button className="header-login-btn">Login</button></Link> : <button onClick={logoutHandler} className="header-logout-btn">Logout</button>}
      </div>
      <ul className="nav">
        
        <Link to='/createAd'><li>Create Your Own Listing</li></Link>
        <Link to='/myAds'><li>Manage Your Listings</li></Link>
      </ul>
    </header>
  );
};

export {Header};
