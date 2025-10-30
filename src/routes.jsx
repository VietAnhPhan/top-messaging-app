import { createBrowserRouter, redirect } from "react-router";
import App from "./App";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Profile from "./components/Profile/Profile";
import { UserContext } from "./Context";
import Setting from "./components/Setting";
import Friend from "./components/Home/Friend/Friend";
import Wrapper from "./components/Wrapper";
import api from "./api";

const router = createBrowserRouter([
  {
    path: "",
    middleware: [authMiddleware],
    loader: dataLoader,
    element: <App></App>,
    children: [
      {
        path: "/",
        loader: homeLoader,
        element: <Home sitename="Messaging App" />,
      },

      {
        path: "/profile",
        loader: dataLoader,
        element: (
          <Wrapper>
            <Profile />
          </Wrapper>
        ),
      },
      {
        path: "/settings",
        element: (
          <Wrapper>
            <Setting></Setting>
          </Wrapper>
        ),
      },
      {
        path: "/friends",
        loader: friendsLoader,
        element: (
          <Wrapper>
            <Friend></Friend>
          </Wrapper>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login sitename="MessagingApp" />,
  },
  {
    path: "/sign-up",
    element: <Signup sitename="Messaging App" />,
  },
]);

async function authMiddleware({ context }) {
  const access = JSON.parse(localStorage.getItem("messaging_app_access"));

  if (!access) throw redirect("/login");

  const user = await api.getUser(access.username, access.token);

  if (!user) throw redirect("/login");

  context.set(UserContext, user);
}

function dataLoader({ context }) {
  const user = context.get(UserContext);

  return user;
}

async function homeLoader({ context }) {
  const user = context.get(UserContext);
  const conversations = await api.getConversations(user.id, user.token);
  let chatUser = null;
  let currentConversation = null;

  if (conversations.length > 0) {
    currentConversation = await api.getCurrentConversation(
      conversations[0].userIds,
      user.token
    );
    chatUser = await api.getChatUser(
      currentConversation.id,
      user.id,
      user.token
    );
  }

  // user.conversations = conversations;
  // user.currentConversation = currentConversation;
  // user.chatUser = chatUser;

  const data = {
    user,
    conversations,
    currentConversation,
    chatUser,
  };

  return data;
}

async function friendsLoader({ context }) {
  const user = context.get(UserContext);
  const sentRequests = await api.getSentRequest(user.token);
  const friendList = await api.getFriends(user.token);
  const receivingRequests = await api.getReceivingInvitations(user.token);

  const friends = {
    sentRequests,
    friendList,
    receivingRequests,
  };

  return friends;
}

export default router;
