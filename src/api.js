const api = {
  getConversations: async (userId, token) => {
    try {
      const response = await fetch(
        `http://localhost:3000/conversations?userId=${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();

      return result;
    } catch (error) {
      console.error(error.message);
    }
  },

  getCurrentConversation: async (userIds, token) => {
    try {
      const response = await fetch(
        `http://localhost:3000/conversations?userIds=${userIds}`,
        {
          method: "GET",
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();

      return result;
    } catch (err) {
      console.error(err.message);
    }
  },

  getSearchContact: async (search, token) => {
    try {
      const response = await fetch(
        `http://localhost:3000/users?contact=${search}&search=true`,
        {
          method: "GET",
          headers: { Authorization: `bearer ${token}` },
        }
      );

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();

      return result;
    } catch (err) {
      console.error(err.message);
    }
  },

  getChatUser: async (currentConversationId, authId, token) => {
    try {
      const response = await fetch(
        `http://localhost:3000/users?conversation_id=${currentConversationId}&auth_id=${authId}`,
        {
          method: "GET",
          headers: { Authorization: `bearer ${token}` },
        }
      );

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();

      return result;
    } catch (err) {
      console.error(err.message);
    }
  },

  getUser: async (username, token) => {
    try {
      const response = await fetch(
        `http://localhost:3000/users?username=${username}`,
        {
          method: "GET",
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      result.token = token;
      return result;
    } catch (err) {
      console.log(err);
    }
  },

  getSentRequest: async (senderId, token) => {
    try {
      const response = await fetch(
        `http://localhost:3000/friendrequests?friend_request=true&sender_id=${senderId}`,
        {
          method: "GET",
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (err) {
      console.log(err);
    }
  },

  login: async (username, password) => {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      body: JSON.stringify({ username: username, password: password }),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();

    return result;
  },

  signUp: async (user) => {
    const response = await fetch("http://localhost:3000/auth/sign-up", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();

    return result;
  },
};

export default api;
