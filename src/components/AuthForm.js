import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import styled from "styled-components";
import { authService } from "../fbase";

const Container = styled.form`
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
`;

const AuthInput = styled.input`
  max-width: 320px;
  width: 100%;
  padding: 10px;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 1);
  margin-bottom: 10px;
  font-size: 12px;
  color: black;
`;

const AuthSubmit = styled(AuthInput)`
  text-align: center;
  background: #04aaff;
  color: white;
  margin-top: 10;
  cursor: pointer;
`;

const AuthError = styled.span`
  color: tomato;
  text-align: center;
  font-weight: 500;
  font-size: 12px;
`;

const AuthSwitch = styled.span`
  color: #04aaff;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 50px;
  display: block;
  font-size: 12px;
  text-decoration: underline;
`;

function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const [error, setError] = useState("");
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        // create account
        data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
      } else {
        // log in
        data = await signInWithEmailAndPassword(authService, email, password);
      }
    } catch (error) {
      setError(error.message.replace("Firebase: ", ""));
    }
  };
  const onSignIn = () => {
    setNewAccount(false);
  };
  const onJoinIn = () => {
    setNewAccount(true);
  };
  return (
    <>
      <Container onSubmit={onSubmit}>
        <AuthInput
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <AuthInput
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <AuthSubmit type="submit" value={newAccount ? "Join In" : "Sign In"} />
      </Container>
      <div>
        {newAccount ? (
          <AuthSwitch onClick={onSignIn}>Sign In</AuthSwitch>
        ) : (
          <AuthSwitch onClick={onJoinIn}>Join In</AuthSwitch>
        )}
      </div>
      {error && <AuthError>{error}</AuthError>}
    </>
  );
}

export default AuthForm;
