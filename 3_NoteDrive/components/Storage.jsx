import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Notes from "./Notes.jsx"
function Storage(props) {
  const [email, setEmail] = useState(props.email);
  const [accInfo, setAccInfo] = useState(false);
  function logout() {
    Cookies.remove("authCookie");
    props.setIsLogged(false);
  }
  function bringAcc() {
    setAccInfo(!accInfo);
  }
  return (
    <div id="storage">
      <div id="middlePanel">
        <div id="toolbar">
        <h1 id="Drive">
          <b>
            <span>D</span>
            <span>r</span>
            <span>i</span>
            <span>v</span>
            <span>e</span>
          </b>
        </h1>
          <button className="logout" onClick={logout}>
            Logout!
          </button>
        </div>
       <Notes email={email}/>
      </div>
      <div id="rightPanel">
        <img onClick={bringAcc} id="account" src="./images/icon.png" />
      </div>
      <div
        id="accountInfo"
        style={
          accInfo
            ? { transform: "translateX(0px)" }
            : { transform: "translateX(500px)" }
        }
      >
        Your Email:
        <span>{email}</span>
      </div>
    </div>
  );
}
export default Storage;
