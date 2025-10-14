import { createBrowserRouter, redirect } from "react-router";
import App from "./App";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Profile from "./components/Profile/Profile";
import { userContext } from "./Context";

const router = createBrowserRouter([
  {
    path: "",
    element: <App></App>,
    children: [
      {
        path: "/",
        middleware: [authMiddleware],
        loader: dataLoader,
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
        middleware: [authMiddleware],
        loader: dataLoader,
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

async function authMiddleware({ context }) {
  const response = await getUser();
  const user = await response.json();

  if (!user) throw redirect("/login");

  context.set(userContext, user);
}

function dataLoader({ context }) {
  const user = context.get(userContext);

  return user;
}

async function getUser() {
  try {
    // const token = localStorage.getItem("access_token");

    const access = JSON.parse(localStorage.getItem("messaging_app_access"));
    const user = await fetch(
      `http://localhost:3000/users?username=${access.username}`,
      {
        method: "GET",
        headers: {
          Authorization: `bearer ${access.token}`,
        },
      }
    );

    return user;
  } catch (err) {
    console.log(err);
  }
}

export default router;
