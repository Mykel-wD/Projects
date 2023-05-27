import React, { useState } from "react";
import Cookies from "js-cookie";
function LogBox(props) {
  const [state, setState] = useState({
    register: false,
    email: "",
    password: "",
  });
  function handleChange() {
    setState({
      ...state,
      register: !state.register,
      email: "",
      password: "",
      message: "",
    });
  }
  function handleInput(e) {
    const target = e.target;
    setState({ ...state, [target.name]: target.value });
  }
  async function handleLogin() {
    setState({ ...state, message: "" });
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "Application/JSON" },
        body: JSON.stringify({
          email: state.email,
          password: state.password,
        }),
      });
      const { success, data } = await response.json();
      if (success) {
        Cookies.set("authCookie", JSON.stringify(state.email));
        props.setIsLogged(true);
      } else {
        setState({ ...state, message: data });
      }
    } catch (error) {
      setState({ ...state, message: error });
    }
  }
  async function handleRegister() {
    setState({ ...state, message: "" });
    //email and password checks
    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        state.email
      )
    ) {
      setState({ ...state, message: "Invalid email format" });
      return;
    }
    if (state.password.length < 8 || state.password.length > 30) {
      setState({
        ...state,
        message: "Password must be between 8 and 30 characters",
      });
      return;
    } //end of checks
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "Application/JSON" },
        body: JSON.stringify({
          email: state.email,
          password: state.password,
        }),
      });
      const { success, data } = await response.json();
      if (success) {
        setState({ ...state, message: "" });
        handleChange();
      } else {
        setState({ ...state, message: data });
      }
    } catch (error) {
      setState({ ...state, message: error });
    }
  }
  return (
    <div id="logBox">
      <h1 id="Drive">
        <b>
          <span>D</span>
          <span>r</span>
          <span>i</span>
          <span>v</span>
          <span>e</span>
        </b>{" "}
      </h1>
      <Login
        state={state}
        change={handleChange}
        handleInput={handleInput}
        handleLogin={handleLogin}
      />
      <Register
        state={state}
        change={handleChange}
        handleInput={handleInput}
        handleRegister={handleRegister}
      />
    </div>
  );
}
function Login({ state, change, handleInput, handleLogin }) {
  return (
    <div className={state.register ? "logForm down" : "logForm"} id="login">
      <h2>Log In</h2>
      E-Mail:
      <input
        name="email"
        type="email"
        onChange={handleInput}
        value={state.email}
        autoComplete="off"
      />
      Password:
      <input
        name="password"
        type="password"
        onChange={handleInput}
        value={state.password}
        autoComplete="off"
      />
      <div className="logButtons">
        <button className="regLog" onClick={change}>
          Register instead
        </button>
        <button className="loginRegister" onClick={handleLogin}>
          Log In!
        </button>
      </div>
      <div id="message">{state.message}</div>
    </div>
  );
}
function Register({ state, change, handleInput, handleRegister }) {
  return (
    <div className={state.register ? "logForm" : "logForm up"} id="register">
      <h2>Register</h2>
      E-Mail:
      <input
        name="email"
        type="email"
        onChange={handleInput}
        value={state.email}
        autoComplete="off"
      />
      Password:
      <input
        name="password"
        type="password"
        onChange={handleInput}
        value={state.password}
        autoComplete="off"
      />
      <div className="logButtons">
        <button className="regLog" onClick={change}>
          Log In instead
        </button>
        <button className="loginRegister" onClick={handleRegister}>
          Register!
        </button>
      </div>
      <div id="message">{state.message}</div>
    </div>
  );
}
export default LogBox;
