import axios from "axios";
import { Buffer } from "buffer";
import { handleLogin, handleLogout } from "~/app/actions";
import { API_URL, CUSTOMER_GROUP, ID_APP, PUBLIC_URL } from "~/utils/constants";
import { asyncPostData } from "~/utils/httpRequest";

// login user
const loginUser = async ({ username, password }) => {
  try {
    const credentials = Buffer.from(username + ":" + password).toString(
      "base64"
    );
    const basicAuth = "Basic " + credentials;
    const resp = await axios.get(
      `${PUBLIC_URL}/auth/local?id_app=${ID_APP}&group_id=${CUSTOMER_GROUP}`,
      {
        headers: {
          Authorization: basicAuth,
        },
      }
    );
    if (resp && resp.status === 200) {
      await handleLogin(resp.data.token, username, password);
      return resp;
    }
  } catch (error) {
    return error;
  }
};

// logout user
const logoutUser = async () => {
  await handleLogout();
};

// sign up
const signup = async ({ data }) => {
  try {
    const resp = await axios.post(`${PUBLIC_URL}/signup`, data);
    if (resp && resp.status === 200) {
      return resp;
    }
  } catch (error) {
    return error;
  }
};

// get profile
const getProfile = async (token) => {
  try {
    const resp = await axios.get(`${API_URL}/profile?access_token=${token}`);
    if (resp && resp.status === 200) {
      return resp;
    }
  } catch (error) {
    return error;
  }
};

// update profile
const updateProfile = async ({ token, data }) => {
  const resp = await asyncPostData({
    apiCode: "updateprofile",
    token,
    data,
    withIdApp: false,
  });
  return resp;
};

// update password
const updatePassword = async ({ token, data }) => {
  const resp = await asyncPostData({
    apiCode: "changepassword",
    token,
    data,
    withIdApp: false,
  });
  return resp;
};

export {
  loginUser,
  logoutUser,
  signup,
  getProfile,
  updateProfile,
  updatePassword,
};
