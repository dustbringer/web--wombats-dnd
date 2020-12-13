import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [moo, setMoo] = React.useState("notmoo'ed yet");

  React.useEffect(() => {
    fetch(`/api/test`)
      .then((res) => res.json().then((json) => ({ status: res.status, json })))
      .then((res) => {
        if (res.status !== 200) {
          throw Error(res.json.error);
        }
        return res.json;
      })
      .then((json) => setMoo(json.moo))
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          Moo: <code>{moo}</code>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
