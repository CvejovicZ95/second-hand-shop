import React from "react";
import { Layout } from "./components/layout/Layout";
import { Login } from "./components/login/Login";
import { Register } from "./components/register/Register";
import { CreateAd } from "./components/createAd/CreateAd";
import { UserAds } from "./components/userAds/UserAds";
import { SingleAd } from "./components/singleAd/SingleAd";

import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";

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
