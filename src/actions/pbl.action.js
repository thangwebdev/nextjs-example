import { asyncGetList, asyncPostData, asyncPutData } from "~/utils/httpRequest";

// get pbl
const getPbl = async ({ token, ma_kh }) => {
  const resp = await asyncGetList({
    apiCode: "pbl_pharma",
    token,
    condition: { page: 1, limit: 1, q: { ma_kh } },
  });
  return resp;
};

const addOrUpdatePbl = async ({ type = "add", token, pbl }) => {
  // type: add || update
  if (type === "add") {
    const resp = await asyncPostData({
      apiCode: "pbl_pharma",
      token,
      data: pbl,
    });
    return resp;
  } else {
    const resp = await asyncPutData({
      apiCode: "pbl_pharma",
      id: pbl._id,
      token,
      data: pbl,
    });
    return resp;
  }
};

const deletePbl = async ({ id, token }) => {
  const resp = await asyncDelete({ apiCode: "pbl_pharma", id, token });
  return resp;
};

export { getPbl, addOrUpdatePbl, deletePbl };
