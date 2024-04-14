import {Layout} from "./components/Layout/Layout.jsx"
import {Login} from "./components/Login/Login.jsx"
import {Register} from "./components/Register/Register.jsx"
import {CreateAd} from "./components/CreateAd/CreateAd.jsx"
import {UserAds} from "./components/UserAds/UserAds.jsx"
import {SingleAd} from "./components/SingleAd/SingleAd.jsx"

import {Navigate, Route,Routes} from 'react-router-dom'
import { useAuthContext } from "./context/AuthContext.js";


function App() {
  const {authUser}=useAuthContext()
  return (
    <Routes>
      <Route path="/" element={<Layout/>}/>

      <Route path="login" element={authUser ? <Navigate to={'/'}/> : <Login/>}/>
      
      <Route path="register" element={<Register/>}/>

      <Route path="createAd" element={<CreateAd/>}/>

      <Route path="/:id" element={<SingleAd/>}/>
      
      <Route path="/myAds" element={<UserAds />} />

    </Routes>
  );
}

export {App};
