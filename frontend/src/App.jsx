import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import GlobalProvider from "./GlobalContext";
import Alerts from './components/Alerts';
import "./App.css";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CalenderPage from "./pages/CalenderPage";
import FishPage from "./pages/FishPage";
import AboutPage from "./pages/AboutPage";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2f3241",
    },
    secondary: {
      main: "#7a7f95",
    },
  },
  typography: {
    fontFamily: `"Lora", "serif"`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

function App() {
  // const [moo, setMoo] = React.useState("notmoo'ed yet");

  // React.useEffect(() => {
  //   fetch(`/api/test`)
  //     .then((res) => res.json().then((json) => ({ status: res.status, json })))
  //     .then((res) => {
  //       console.log(res);
  //       if (res.status !== 200) {
  //         throw Error(res.json.error);
  //       }
  //       return res.json;
  //     })
  //     .then((json) => setMoo(json.moo))
  //     .catch((err) => console.log("ERRORR", err.message));
  // }, []);

  return (
    <div id="root">
      <GlobalProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <Navbar />
            <div id="content">
              <Switch>
                <Route path="/calender" exact component={CalenderPage} />
                <Route path="/fish" exact component={FishPage} />
                <Route path="/about" exact component={AboutPage} />
                <Route path="/" component={HomePage} />
              </Switch>
            </div>
          </Router>
          <Footer />
          <Alerts />
        </ThemeProvider>
      </GlobalProvider>
    </div>
  );
}

export default App;
