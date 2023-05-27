import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import LogBox from "./LogBox.jsx";
import Storage from "./Storage.jsx";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    //cookie auto login check
    const authCookie = Cookies.get("authCookie");
    if (authCookie) setIsLogged(true);
  }, []);
  function handleIsLogged(status) {
    setIsLogged(status);
  }
  return (
    <div id="container">
      {!isLogged ? (
        <LogBox setIsLogged={handleIsLogged} />
      ) : (
        <Storage
          setIsLogged={handleIsLogged}
          email={JSON.parse(Cookies.get("authCookie"))}
        />
      )}
    </div>
  );
}
export default App;
