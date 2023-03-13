import "./App.css";
import Main from "./components/Main/Main";
import Navbar from "./components/Navbar/Navbar";
import { v4 as uuidv4 } from "uuid";
import ReactGA from "react-ga4";
import { useEffect } from "react";

ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);

export function typeMessage(
  message,
  speed,
  callbackBeforeTyping,
  callbackafterTyping
) {
  let i = 0;
  const id = uuidv4();
  const intervalId = setInterval(() => {
    i = i + 1;

    callbackBeforeTyping && callbackBeforeTyping(id, i, message);

    if (i === message.length) {
      clearInterval(intervalId);

      callbackafterTyping && callbackafterTyping();
    }
  }, speed);

  window.intervalId = intervalId;
}

export const getDevices = () => {
  let deviceName = "Unknown";
  let numCores = navigator.hardwareConcurrency;

  if (navigator.userAgent.match(/Android/i)) {
    deviceName = "Android";
  } else if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
    deviceName = "iOS";
  } else if (navigator.userAgent.match(/Windows Phone/i)) {
    deviceName = "Windows Phone";
  } else if (navigator.userAgent.match(/Windows/i)) {
    deviceName = "Windows PC";
  } else if (navigator.userAgent.match(/Macintosh|Mac OS X/i)) {
    deviceName = "Mac";
  } else if (navigator.userAgent.match(/Linux/i)) {
    deviceName = "Linux PC";
  }

  return deviceName + " " + numCores;
};

function App() {
  const pathname = window.location.pathname;
  const search = window.location.search;

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: pathname + search });
  }, [pathname, search]);

  return (
    <div className="wrapper">
      <Layout />
    </div>
  );
}

export default App;

function Layout() {
  return (
    <div className="main">
      <Navbar />
      <Main />
    </div>
  );
}
