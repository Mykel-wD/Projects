import React, { useState } from "react";
function LogForm(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
    message: "",
    name: "",
    surname: "",
    age: "",
  });
  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }
  async function login() {
    setState({ ...state, message: "" });
    try {
      let response = await fetch("/login", {
        method: "POST",
        body: JSON.stringify({ email: state.email, password: state.password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      response = await response.json();
      if (response.success) {
        props.changeIsLogged(state.email);
      } else {
        setState({ ...state, message: response.message });
      }
    } catch (error) {
      setState({ ...state, message: error });
    }
  }
  async function register() {
    setState({ ...state, message: "" });
    try {
      let response = await fetch("/register", {
        method: "POST",
        body: JSON.stringify({
          email: state.email,
          password: state.password,
          name: state.name,
          surname: state.surname,
          age: state.age,
        }),
        headers: { "Content-Type": "application/json" },
      });
      response = await response.json();
      if (response.success) {
        props.changeIsLogged(state.email);
      } else {
        setState({ ...state, message: response.message });
      }
    } catch (er) {
      setState({ ...state, message: er });
    }
  }
  return (
    <div className="container">
      <div className="login-register">
        <h1>Register!</h1>
        Email:
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        Password:
        <input
          name="password"
          type="password"
          value={state.password}
          onChange={handleChange}
        />
        Name:
        <input name="name" value={state.name} onChange={handleChange} />
        Surname:
        <input name="surname" value={state.surname} onChange={handleChange} />
        Age:
        <input name="age" value={state.age} onChange={handleChange} />
        <button onClick={register}>Register!</button>
        <div>{state.message}</div>
      </div>
      <div className="login-register">
        <h1>Login</h1>
        email:
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        password:
        <input
          name="password"
          type="password"
          value={state.password}
          onChange={handleChange}
        />
        <button onClick={login}>Login!</button>
        <div>{state.message}</div>
      </div>
    </div>
  );
}
export default LogForm;
