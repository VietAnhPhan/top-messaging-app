import "./App.css";

import { useState } from "react";

import { Header } from "./header/header.jsx";

import { AuthContext } from "./Context";
import { Outlet } from "react-router";

function App() {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  return (
    <>
      <AuthContext value={{ token, setToken }}>
        <Header />
        <Outlet></Outlet>
      </AuthContext>
    </>
  );
}

export default App;
