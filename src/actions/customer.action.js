import { asyncPutData } from "~/utils/httpRequest";

const updateCustomer = async ({ id, token, data }) => {
  const resp = await asyncPutData({ apiCode: "customer", id, token, data });
  return resp;
};
export { updateCustomer };
