import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
function Storage(props) {
  const [email, setEmail] = useState(props.email);
  const [accInfo, setAccInfo] = useState(false);
  const [note, setNote] = useState("");
  const [h2Note, setH2Note] = useState("");
  function logout() {
    Cookies.remove("authCookie");
    props.setIsLogged(false);
  }
  function bringAcc() {
    setAccInfo(!accInfo);
  }
  function handleNote(e) {
    setNote(e.target.value);
  }
  async function handleSetNote() {
    setH2Note(note);
    try {
      await fetch("http://localhost:3000/setnote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note: note, email: email }),
      });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    async function getNote() {
      try {
        const response = await fetch("http://localhost:3000/getnote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email }),
        });
        const data = await response.json();
        setNote(data.note);
        setH2Note(data.note);
      } catch (error) {
        console.log(error);
      }
    }
    getNote();
  }, []);
  return (
    <div id="storage">
      <div id="leftPanel">
        <h1 id="Drive">
          <b>
            <span>D</span>
            <span>r</span>
            <span>i</span>
            <span>v</span>
            <span>e</span>
          </b>{" "}
        </h1>
      </div>
      <div id="middlePanel">
        <div id="toolbar">
          <div id="searchbar"></div>
          <button className="logout" onClick={logout}>
            Logout!
          </button>
        </div>
        <div id="dashboard">
          Some personal content, lets just make it a note:<br></br>
          <input onChange={handleNote} value={note} />
          <br></br>
          <button onClick={handleSetNote}>Save Note!</button>
          <h2>{h2Note}</h2>
        </div>
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
