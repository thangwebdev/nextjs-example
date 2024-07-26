import axios from "axios";
import { API_URL, ID_APP, PUBLIC_TOKEN } from "./constants";
import { generateSearchKeywords } from "./helpers";

const asyncPublicRequest = async ({
  method = "get",
  endpoint,
  withIdApp = true,
  searchObj,
  data,
}) => {
  const queryString = generateSearchKeywords(searchObj);

  const url = `${API_URL}${withIdApp ? `/${withIdApp ? ID_APP : ""}` : ""}${
    endpoint || ""
  }${queryString}${`${!!queryString ? "&" : "?"}access_token=${PUBLIC_TOKEN}`}`;

  const resp = await axios[method](url, data);
  return resp;
};

// get list
const asyncGetList = async ({
  apiCode = "dmnvt",
  withIdApp = true,
  condition = {},
  applyToken = true,
  token,
}) => {
  try {
    const queryString = generateSearchKeywords(condition);

    const url = `${API_URL}${
      withIdApp ? `/${withIdApp ? ID_APP : ""}` : ""
    }${`/${apiCode || ""}`}${queryString}${
      applyToken
        ? `${`${!!queryString ? "&" : "?"}access_token=${
            token || PUBLIC_TOKEN
          }`}`
        : ""
    }`;

    const resp = await axios.get(url);
    if (resp.status === 200) {
      return resp;
    }
  } catch (error) {
    return error.response;
  }
};

// get item
const asyncGet = async ({
  apiCode = "dmnvt",
  withIdApp = true,
  applyToken = true,
  token,
  id,
}) => {
  try {
    const url = `${API_URL}${
      withIdApp ? `/${withIdApp ? ID_APP : ""}` : ""
    }${`/${apiCode || ""}`}/${id || ""}${
      applyToken ? `?access_token=${token || PUBLIC_TOKEN}` : ""
    }`;

    const resp = await axios.get(url);
    if (resp.status === 200) {
      return resp;
    }
  } catch (error) {
    return error.response;
  }
};

// post data
const asyncPostData = async ({
  apiCode = "dmnvt",
  withIdApp = true,
  data = {},
  applyToken = true,
  token,
}) => {
  try {
    const url = `${API_URL}${
      withIdApp ? `/${withIdApp ? ID_APP : ""}` : ""
    }${`/${apiCode || ""}`}${
      applyToken ? `?access_token=${token || PUBLIC_TOKEN}` : ""
    }`;

    const resp = await axios.post(url, data);
    if (resp.status === 200) {
      return resp;
    }
  } catch (error) {
    return error.response;
  }
};

// put data
const asyncPutData = async ({
  apiCode = "dmnvt",
  id,
  withIdApp = true,
  data = {},
  applyToken = true,
  token,
}) => {
  try {
    const url = `${API_URL}${
      withIdApp ? `/${withIdApp ? ID_APP : ""}` : ""
    }${`/${apiCode || ""}/`}${id || ""}${
      applyToken ? `?access_token=${token || PUBLIC_TOKEN}` : ""
    }`;

    const resp = await axios.put(url, data);
    if (resp.status === 200) {
      return resp;
    }
  } catch (error) {
    return error.response;
  }
};

// delete
const asyncDelete = async ({
  apiCode = "dmnvt",
  id,
  withIdApp = true,
  applyToken = true,
  token,
}) => {
  try {
    const url = `${API_URL}${
      withIdApp ? `/${withIdApp ? ID_APP : ""}` : ""
    }${`/${apiCode || ""}/`}${id || ""}${
      applyToken ? `?access_token=${token || PUBLIC_TOKEN}` : ""
    }`;

    const resp = await axios.delete(url);
    if (resp.status === 200) {
      return resp;
    }
  } catch (error) {
    return error.response;
  }
};

export { asyncPublicRequest, asyncGet, asyncGetList, asyncPostData, asyncPutData, asyncDelete };
