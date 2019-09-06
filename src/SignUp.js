import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "./base";
import "./SignUp.css";

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      history.push("/");
    } catch (error) {
      alert(error);
    }
  }, [history]);

  return (
    <div class="form-style-5" >
      <form onSubmit={handleSignUp}>
      <fieldset>
  <legend align="center">Sign Up</legend>
        <label>
          <input name="email" type="email" placeholder="Email" />
     
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button class="btn" type="submit">Sign Up</button>
        </fieldset>
      </form>
      <form action="http://localhost:3000/login" class="inline">
    <button class="btn">Go To Log In</button>
    
</form>



    </div>
  );
};

export default withRouter(SignUp);
