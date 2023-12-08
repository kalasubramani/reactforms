import { useState } from "react";
import "./SignUpForm.css";

function SignUpForm({ setAuthToken }) {
  //setup useState hooks to track form data
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setsuccessMessage] = useState(null);

  //set current username value from form and set it to useState
  function handleUserName(e) {
    setUserName(e.target.value);
    console.log("handleUserName event fired ", e.target.value);
  }

  //set current password value from form and set it to useState
  function handlePassword(e) {
    setPassword(e.target.value);
    console.log("handlePassword event fired ", e.target.value);
  }

  //handles form submit and makes api call
  async function handleSubmit(e) {
    e.preventDefault();

    //make api calls inside try. Sends username and pwd to api
    try {
      console.log("submit event fired");
      // setErrorMessage("dummy error");
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );
      const data = await response.json();

      //set auth token and success message to useState
      setAuthToken(data.token);
      setsuccessMessage(data.message);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <div className="signup">
      <h3>Signup form</h3>
      <h5>Enter your username and password to signup for the event!</h5>
      {/* if there is an error message, display it */}
      {errorMessage && (
        <p className="error">
          {" "}
          An error occured. Here is the error detail: {errorMessage}
        </p>
      )}
      {/* display success message  */}
      {successMessage && (
        <p className="success">
          {successMessage} You can go ahead and generate your event token below.
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="input">
          <label>
            User Name:{" "}
            <input value={username} onChange={handleUserName} maxLength={8} minLength={8} required/>
          </label>
          <label>
            Password:{" "}
            <input value={password} onChange={handlePassword} type="password" required />
          </label>
        </div>
        <button className="button" >
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
