import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "./base.js";
import { AuthContext } from "./Auth.js";
import "./SignUp.css";

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div class="form-style-5">
      <legend align="center">Log In</legend>
      
      <form onSubmit={handleLogin}>
        <label>
          
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button class="btn" type="submit">Log in</button>
       
</form>
<br/>
<form action="http://localhost:3000/signup" class="inline">
    <button class="btn">Go To Sign Up</button>
    
</form>
       
    </div>
  );
};

export default withRouter(Login);
