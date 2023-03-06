import "./App.css";
import Main from "./components/Main/Main";
import Navbar from "./components/Navbar/Navbar";
import { v4 as uuidv4 } from "uuid";

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
}

function App() {
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
