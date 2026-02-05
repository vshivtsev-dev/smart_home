"use client";
import {authClient} from "@/utils/auth/auth-client";

export default function SignIn() {
  return (
    <div>
      <h3>sign-in</h3>
      <button
        type={"button"}
        onClick={() => {
          authClient.signIn.email({
            email: "test@email.com",
            password: "12345678",
          });
        }}
      >
        sign-in
      </button>
    </div>
  );
}
