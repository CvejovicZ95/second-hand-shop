import Layout from "./components/Layout";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateAd from "./components/CreateAd";
import MyAds from "./components/MyAds";
import SingleAd from "./components/SingleAd";

import {Navigate, Route,Routes} from 'react-router-dom'
import { useAuthContext } from "./context/AuthContext";


function App() {
  const {authUser}=useAuthContext()
  return (
    <Routes>
      <Route path="/" element={<Layout/>}/>

      <Route path="login" element={authUser ? <Navigate to={'/'}/> : <Login/>}/>
      
      <Route path="register" element={<Register/>}/>

      <Route path="createAd" element={<CreateAd/>}/>

      <Route path="/:id" element={<SingleAd/>}/>
      
      <Route path="/myAds" element={<MyAds />} />

    </Routes>
  );
}

export default App;
