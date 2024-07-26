"use server";

import { cookies } from "next/headers";
const domain =
  process.env.NODE_ENV === "production" ? process.env.DOMAIN : "localhost";

export async function handleLogin(token, username, password) {
  // set token
  cookies().set("token", btoa(token), {
    httpOnly: true,
    secure: false,
    domain: `.${domain}`,
    // secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  // set username
  cookies().set("email", btoa(username), {
    httpOnly: true,
    secure: false,
    domain: `.${domain}`,
    // secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
  // set password
  cookies().set("password", btoa(password), {
    httpOnly: true,
    secure: false,
    domain: `.${domain}`,
    // secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
}

export async function handleLogout() {
  cookies().delete("token");
}
