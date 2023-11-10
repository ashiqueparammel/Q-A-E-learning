import React from "react";
import { Routes, Route } from "react-router-dom";
import { RouteCheck } from "./Helpers/RouteCheck";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Admin from "./Components/Admin/Admin";
import Test from "./Components/Test/Test";
function App() {

  return (
    <div>
      <Routes>
        <Route Component={Signup} path="/signup" />
        <Route Component={Login} path="/login" />
        <Route Component={RouteCheck} path="/" />
        <Route Component={Admin} path="/admin" />
        <Route Component={Test} path="/test" />
      </Routes>
    </div>
  )
}

export default App
