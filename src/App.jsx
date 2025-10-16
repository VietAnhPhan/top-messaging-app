import "./App.css";

import { Header } from "./header/header.jsx";
import { Outlet, useLoaderData } from "react-router";

function App() {
  // const [token, setToken] = useState(useContext(UserContext));
  const loaderData = useLoaderData();
  return (
    <>
      {/* <userContext value={{ token, setToken }}> */}
      {/* <Header /> */}
      <div className="flex flex-col flex-col-reverse md:flex-row h-full">
        <Header loaderData={loaderData}></Header>
        <Outlet></Outlet>
        {/* </userContext> */}
      </div>
    </>
  );
}

export default App;
