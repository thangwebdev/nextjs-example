import {
  asyncDelete,
  asyncGetList,
  asyncPostData,
  asyncPutData,
} from "~/utils/httpRequest";

const getCart = async ({ token, user, ma_kh }) => {
  const resp = await asyncGetList({
    apiCode: "cart2",
    token,
    condition: { page: 1, limit: 99999, q: { user, ma_kh } },
  });
  return resp;
};

const addOrUpdateItemCart = async ({ type = "add", token, cartItem }) => {
  // type: add || update
  if (type === "add") {
    const resp = await asyncPostData({
      apiCode: "cart2",
      token,
      data: cartItem,
    });
    return resp;
  } else {
    const resp = await asyncPutData({
      apiCode: "cart2",
      id: cartItem._id,
      token,
      data: cartItem,
    });
    return resp;
  }
};

const deleteItemCart = async ({ id, token }) => {
  const resp = await asyncDelete({ apiCode: "cart2", id, token });
  return resp;
};

export { getCart, addOrUpdateItemCart, deleteItemCart };
// import {
//   asyncDelete,
//   asyncGetList,
//   asyncPostData,
//   asyncPutData,
// } from "~/utils/httpRequest";

// const getCart = async ({ token, ma_kh }) => {
//   const resp = await asyncGetList({
//     apiCode: "pbl_pharma",
//     token,
//     condition: { page: 1, limit: 1, q: { ma_kh } },
//   });
//   return resp;
// };

// const addOrUpdateCart = async ({ type = "add", token, pbl }) => {
//   // type: add || update
//   if (type === "add") {
//     const resp = await asyncPostData({
//       apiCode: "pbl_pharma",
//       token,
//       data: pbl,
//     });
//     return resp;
//   } else {
//     const resp = await asyncPutData({
//       apiCode: "pbl_pharma",
//       id: pbl._id,
//       token,
//       data: pbl,
//     });
//     return resp;
//   }
// };

// const deleteCart = async ({ id, token }) => {
//   const resp = await asyncDelete({ apiCode: "pbl_pharma", id, token });
//   return resp;
// };

// export { getCart, addOrUpdateCart, deleteCart };
