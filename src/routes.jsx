import { createBrowserRouter, redirect } from "react-router";
import App from "./App";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Profile from "./components/Profile/Profile";
import { UserContext } from "./Context";
import Setting from "./components/Setting";
import Friend from "./components/Home/Friend";
import Wrapper from "./components/Wrapper";

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
        element: <Home sitename="ReactJS template" />,
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
    element: <Login sitename="ReactJS template" />,
  },
  {
    path: "/signup",
    element: <Signup sitename="ReactJS template" />,
  },
]);

async function authMiddleware({ context }) {
  const user = await getUser();

  if (!user) throw redirect("/login");

  context.set(UserContext, user);
}

function dataLoader({ context }) {
  const user = context.get(UserContext);

  return user;
}

async function homeLoader({ context }) {
  const user = context.get(UserContext);
  const conversations = await getConversations(user.id);
  let chatUser = null;
  let currentConversation = null;

  if (conversations.length > 0) {
    currentConversation = await getCurrentConversation(
      conversations[0].userIds
    );
    chatUser = await getChatUser(currentConversation.id, user.id);
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
  const sentRequests = await getSentRequest(user);

  const friends = {
    sentRequests,
  };

  return friends;
}

async function getUser() {
  try {
    const access = JSON.parse(localStorage.getItem("messaging_app_access"));
    const rs = await fetch(
      `http://localhost:3000/users?username=${access.username}`,
      {
        method: "GET",
        headers: {
          Authorization: `bearer ${access.token}`,
        },
      }
    );

    const user = await rs.json();
    user.token = access.token;
    return user;
  } catch (err) {
    console.log(err);
  }
}

async function getConversations(userId) {
  try {
    const access = JSON.parse(localStorage.getItem("messaging_app_access"));
    const rs = await fetch(
      `http://localhost:3000/conversations?userId=${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `bearer ${access.token}`,
        },
      }
    );

    const conversations = await rs.json();

    return conversations;
  } catch (err) {
    console.log(err);
  }
}

async function getCurrentConversation(userIds) {
  try {
    const access = JSON.parse(localStorage.getItem("messaging_app_access"));
    const currentConversationRes = await fetch(
      `http://localhost:3000/conversations?userIds=${userIds}`,
      {
        method: "GET",
        headers: {
          Authorization: `bearer ${access.token}`,
        },
      }
    );
    const currentConversation = await currentConversationRes.json();

    return currentConversation;
  } catch (err) {
    console.log(err);
  }
}

async function getChatUser(conversationId, authId) {
  try {
    const access = JSON.parse(localStorage.getItem("messaging_app_access"));
    const chatUserRes = await fetch(
      `http://localhost:3000/users?conversation_id=${conversationId}&auth_id=${authId}`,
      {
        method: "GET",
        headers: {
          Authorization: `bearer ${access.token}`,
        },
      }
    );
    const chatUser = await chatUserRes.json();

    return chatUser;
  } catch (err) {
    console.log(err);
  }
}

async function getSentRequest(sender) {
  try {
    const friendReqRes = await fetch(
      `http://localhost:3000/friendrequests?friend_request=true&sender_id=${sender.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `bearer ${sender.token}`,
        },
      }
    );
    const friendrequests = await friendReqRes.json();

    return friendrequests;
  } catch (err) {
    console.log(err);
  }
}

export default router;
