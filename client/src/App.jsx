import React from "react";
import { Layout } from "./components/layout/Layout.jsx";
import { Login } from "./components/login/Login.jsx";
import { Register } from "./components/register/Register.jsx";
import { CreateAd } from "./components/createAd/CreateAd.jsx";
import { UserAds } from "./components/userAds/UserAds.jsx";
import { SingleAd } from "./components/singleAd/SingleAd.jsx";

import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext.js";

export function App() {
  const { authUser } = useAuthContext();
  return (
    <Routes>
      <Route path="/" element={<Layout />} />

      <Route
        path="login"
        element={authUser ? <Navigate to={"/"} /> : <Login />}
      />

      <Route path="register" element={<Register />} />

      <Route path="createAd" element={<CreateAd />} />

      <Route path="/:id" element={<SingleAd />} />

      <Route path="/myAds" element={<UserAds />} />
    </Routes>
  );
}
