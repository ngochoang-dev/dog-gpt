import { createContext, useState, useContext } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [openNav, setOpenNav] = useState(false);
  const [customerMessage, setCustomerMessage] = useState("");
  const [isTyped, setIsTyped] = useState(false);
  const [titleNav, setTitleNav] = useState("");
  const [isTyping, setTyping] = useState(false);
  const [inputStyle, setInputStyle] = useState({});
  const [allowSubmit, setAllowSubmit] = useState(true);

  const handleClearData = () => {
    if (!allowSubmit) return;
    clearInterval(window.intervalId);

    setTyping(false);
    setIsTyped(false);
    setInputStyle({});
    setCustomerMessage("");
    setData([]);
    setTitleNav("");
  };

  return (
    <AppContext.Provider
      value={{
        customerMessage,
        setCustomerMessage,
        data,
        setData,
        isTyped,
        setIsTyped,
        openNav,
        setOpenNav,
        titleNav,
        setTitleNav,
        isTyping,
        setTyping,
        inputStyle,
        setInputStyle,
        handleClearData,
        allowSubmit,
        setAllowSubmit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export const AppContextGlobal = () => useContext(AppContext);
