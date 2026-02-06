"use client";

import {authClient} from "@/utils/auth/auth-client";

export default function Home() {
  function signUp() {
    console.log("signUp");
    authClient.signUp.email({
      name: "testUser",
      email: "test@email.com",
      password: "12345678",
    });
  }
  return (
    <div>
      <button type={"button"} onClick={() => signUp()}>
        signUp
      </button>
    </div>
  );
}
