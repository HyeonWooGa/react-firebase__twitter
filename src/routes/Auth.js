import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import React from "react";
import AuthForm from "../components/AuthForm";
import { authService } from "../fbase";

function Auth() {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;

    switch (name) {
      case "Google":
        provider = new GoogleAuthProvider();
        break;
      case "Github":
        provider = new GithubAuthProvider();
        break;
    }
    const data = await signInWithPopup(authService, provider);
    console.log(data);
  };
  return (
    <>
      <AuthForm />
      <div>
        <button onClick={onSocialClick} name="Google">
          Continue with Google
        </button>
        <button onClick={onSocialClick} name="Github">
          Continue with Github
        </button>
      </div>
    </>
  );
}

export default Auth;
