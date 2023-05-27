import React, { useState, useEffect } from "react";
function Account(props) {
  const [state, setState] = useState({
    email: props.email,
    password: "",
    name: "",
    surname: "",
    age: "",
    password2: "",
    message: "",
  });
  useEffect(async () => {
    try {
      const response = await fetch("getuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: state.email }),
      });
      const { name, surname, age } = await response.json();
      setState({ ...state, name: name, surname: surname, age: age });
    } catch (er) {
      setState({ ...state, message: er });
    }
  }, []);
  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }
  async function changePassword() {
    setState({ ...state, message: "" });
    try {
      const response = await fetch("/changepassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: state.email,
          password: state.password,
          password2: state.password2,
        }),
      });
      const responseData = await response.json();
      if (responseData.success) {
        setState({ ...state, message: "Password Changed!" });
      }
    } catch (error) {
      setState({ ...state, message: error });
    }
  }
  return (
    <div className="container">
      <div id="account">
        <h2>Account info:</h2>
        <span>{state.email}</span>
        <span>{state.name}</span>
        <span>{state.surname}</span>
        <span>{state.age}</span>
        <span>Change password:</span>
        <span id="changePassword">
          Old password
          <input
            name="password"
            onChange={handleChange}
            type="password"
            value={state.password}
          />
          New password:
          <input
            name="password2"
            onChange={handleChange}
            type="password"
            value={state.password2}
          />
          <button onClick={changePassword}>Change!</button>
        </span>
        {state.message}
      </div>
    </div>
  );
}

export default Account;
