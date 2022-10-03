import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import React from "react";
import AuthForm from "../components/AuthForm";
import { authService } from "../fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";
import Footer from "../components/Footer";

const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const AuthBtns = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 320px;
`;

const AuthBtn = styled.button`
  cursor: pointer;
  border-radius: 20px;
  border: none;
  padding: 10px 0px;
  font-size: 12px;
  text-align: center;
  width: 150px;
  background: white;
  cursor: pointer;
`;

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
      <AuthContainer>
        <FontAwesomeIcon
          icon={faTwitter}
          color={"#04aaff"}
          size="3x"
          style={{ marginBottom: 30 }}
        />
        <AuthForm />
        <AuthBtns>
          <AuthBtn onClick={onSocialClick} name="Google">
            Continue with Google <FontAwesomeIcon icon={faGoogle} />
          </AuthBtn>
          <AuthBtn onClick={onSocialClick} name="Github">
            Continue with Github <FontAwesomeIcon icon={faGithub} />
          </AuthBtn>
        </AuthBtns>
        <Footer />
      </AuthContainer>
    </>
  );
}

export default Auth;
