import { createContext, useState, useContext } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);

  const [customerMessage, setCustomerMessage] = useState("");
  const [isTyped, setIsTyped] = useState(false);
  return (
    <AppContext.Provider
      value={{
        customerMessage,
        setCustomerMessage,
        data,
        setData,
        isTyped,
        setIsTyped,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export const AppContextGlobal = () => useContext(AppContext);
