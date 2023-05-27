import React, { useState } from "react";
import LogForm from "./LogForm.jsx";
import Account from "./Account.jsx";
function App() {
  const [logged, setLogged] = useState(false);
  const [email, setEmail] = useState("")
  function changeIsLogged(email) {
    setEmail(email)
    setLogged(!logged);
  }
  return (
    <div id="root-container">
      {!logged ? (
        <LogForm changeIsLogged={changeIsLogged} />
      ) : (
        <Account changeIsLogged={changeIsLogged} email={email} />
      )}
    </div>
  );
}
export default App;
