import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { authService } from "../fbase";

function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
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
      console.log(data);
    } catch (error) {
      setError(error.message.replace("Firebase: ", ""));
    }
  };
  const isSignIn = (event) => {
    const {
      target: { name },
    } = event;

    switch (name) {
      case "SignIn":
        setNewAccount(false);
        break;
      case "JoinIn":
        setNewAccount(true);
        break;
    }
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "Join In" : "Sign In"} />
      </form>
      <div>
        <button onClick={isSignIn} name="SignIn">
          Sign In
        </button>
        <button onClick={isSignIn} name="JoinIn">
          Join In
        </button>
      </div>
      {error}
    </>
  );
}

export default AuthForm;
