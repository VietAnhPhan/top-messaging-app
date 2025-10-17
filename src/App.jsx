import "./App.css";

import { Header } from "./header/header.jsx";
import { Outlet, useLoaderData } from "react-router";

function App() {
  const loaderData = useLoaderData();
  return (
    <>
      <div className="flex flex-col-reverse md:flex-row h-full dark:bg-slate-900">
        <Header loaderData={loaderData}></Header>
        <Outlet></Outlet>
      </div>
    </>
  );
}

export default App;
