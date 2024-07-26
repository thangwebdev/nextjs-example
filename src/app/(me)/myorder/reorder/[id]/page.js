import React from "react";
import { cookies } from "next/headers";
import { asyncGet } from "~/utils/httpRequest";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Đặt lại đơn",
};

async function ReOrderPage({ params }) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  const respOrder = await asyncGet({
    apiCode: "pbl_pharma",
    token: atob(token),
    id: params.id,
  });

  if (respOrder?.status !== 200) {
    redirect("/myorder");
  }

  const order = respOrder.data;

  return <div>{JSON.stringify(order)}</div>;
}

export default ReOrderPage;
