const serverURL = import.meta.env.PROD
  ? import.meta.env.VITE_SERVER_DOMAIN
  : import.meta.env.VITE_LOCAL_HOST;

const api = {
  getConversations: async (userId, token) => {
    try {
      const response = await fetch(
        `${serverURL}/conversations?userId=${userId}`,
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
        `${serverURL}/conversations?userIds=${userIds}`,
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
        `${serverURL}/users?contact=${search}&search=true`,
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
        `${serverURL}/users?conversation_id=${currentConversationId}&auth_id=${authId}`,
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
      const response = await fetch(`${serverURL}/users?username=${username}`, {
        method: "GET",
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

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

  getSentRequest: async (token) => {
    try {
      const response = await fetch(`${serverURL}/friendrequests?sent=true`, {
        method: "GET",
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

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
    const response = await fetch(`${serverURL}/auth/login`, {
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
    const response = await fetch(`${serverURL}/auth/sign-up`, {
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

  sendInvitation: async (receiverId, token) => {
    const response = await fetch(`${serverURL}/friendrequests`, {
      method: "POST",
      body: JSON.stringify({
        receiverId: receiverId,
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();

    return result;
  },

  revokeInvitation: async (id, token) => {
    const response = await fetch(
      `${serverURL}/friendrequests/${id}?revoke=true`,
      {
        method: "PATCH",

        headers: {
          "Content-type": "application/json",
          Authorization: `bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();

    return result;
  },

  rejectInvitation: async (id, token) => {
    const response = await fetch(
      `${serverURL}/friendrequests/${id}?reject=true`,
      {
        method: "PATCH",

        headers: {
          "Content-type": "application/json",
          Authorization: `bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();

    return result;
  },

  getReceivingInvitations: async (token) => {
    try {
      const response = await fetch(
        `${serverURL}/friendrequests?receiving=true`,
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

  getInvitation: async (chatUserId, token) => {
    try {
      const response = await fetch(
        `${serverURL}/friendrequests?chatUserId=${chatUserId}`,
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

  acceptInvitation: async (id, token) => {
    try {
      const response = await fetch(
        `${serverURL}/friendrequests/${id}?accept=true`,
        {
          method: "PATCH",
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

  unfriend: async (id, chatUserId, token) => {
    try {
      const response = await fetch(
        `${serverURL}/friendrequests/${id}?unfriend=true&chatUserId=${chatUserId}`,
        {
          method: "PATCH",
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

  getFriends: async (token) => {
    try {
      const response = await fetch(`${serverURL}/friends?auth=true`, {
        method: "GET",
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (err) {
      console.log(err);
    }
  },

  sendMessage: async (message, token) => {
    try {
      const response = await fetch(`${serverURL}/messages`, {
        method: "POST",
        body: JSON.stringify(message),
        headers: {
          "Content-type": "application/json",
          Authorization: `bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (err) {
      console.log(err);
    }
  },

  updateProfile: async (authId, formData, token) => {
    try {
      const response = await fetch(`${serverURL}/users/${authId}`, {
        method: "PUT",
        body: formData,
        headers: {
          "Content-type": "application/json",
          Authorization: `bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (err) {
      console.log(err);
    }
  },
};

export default api;
