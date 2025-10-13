import "./App.css";

import { useContext, useState } from "react";

import { Header } from "./header/header.jsx";

import { userContext } from "./Context";
import { Outlet } from "react-router";

function App() {
  const [token, setToken] = useState(useContext(userContext));
  return (
    <>
      {/* <userContext value={{ token, setToken }}> */}
        {/* <Header /> */}
        <Outlet></Outlet>
      {/* </userContext> */}
    </>
  );
}

export default App;
