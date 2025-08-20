import React, { createContext } from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "./pages/admin/Admin";
import Moderator from "./pages/moderator/Moderator";
import User from "./pages/user/User";
import Home from "./pages/landing/Home";

export const Context = createContext();
function App() {
  return (
    <Context.Provider value={{}}>
      <Routes>
        <Route element={<Admin/>} path="admin/*"/>
        <Route element={<Moderator />} path="moderator/*"/>
        <Route element={<User />} path="user/*"/>
        <Route element={<Home/>} path="/"/>
      </Routes>
    </Context.Provider>
  );
}

export default App;
