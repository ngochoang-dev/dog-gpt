import "./App.css";
import Main from "./components/Main/Main";
import Navbar from "./components/Navbar/Navbar";

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
