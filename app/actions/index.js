"use server";

import { signIn } from "@/auth";
// import { signIn } from "next-auth/react";

export async function ceredntialLogin(formData) {
  console.log("formData = ", formData);
  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    return response;
  } catch (error) {
    console.log("error == ", error);
    throw new Error(error);
  }
}

export async function doSocialLogin(formData) {
  const action = await formData.get("action");

  await signIn(action, { redirectTo: "/courses" });
}
