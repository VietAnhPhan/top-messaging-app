import { createBrowserRouter } from "react-router";
import App from "./App";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Profile from "./components/Profile/Profile";

const router = createBrowserRouter([
  {
    path: "",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home sitename="ReactJS template" />,
      },
      {
        path: "/login",
        element: <Login sitename="ReactJS template" />,
      },
      {
        path: "/signup",
        element: <Signup sitename="ReactJS template" />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/your-posts",
      },
      {
        path: "/new-post",
      },
    ],
  },
]);

export default router;
