import { AppContextGlobal } from "../../AppContext";
import styles from "./Navbar.module.css";
import { typeMessage } from "../../App";
import { useEffect, useState } from "react";

function Navbar() {
  const { isTyped, data } = AppContextGlobal();
  const [titleNav, setTitleNav] = useState("");
  const [isTyping, setTyping] = useState(false);

  const beforeTyping = (id, i, message) => {
    setTyping(true);
    setTitleNav((prev) => {
      const mess = prev.concat(message[i - 1]);

      return mess;
    });
  };

  const afterTyping = () => {
    setTyping(false);
  };

  useEffect(() => {
    if (isTyped && !titleNav) {
      typeMessage(data[0].content, 200, beforeTyping, afterTyping);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTyped, titleNav]);

  return (
    <div className={styles.wrapper_nav}>
      <button className={styles.btn_new_chat}>
        {titleNav ? (
          <span className={styles.title}>
            {titleNav} {isTyping && <span className="typing nav-typing" />}
          </span>
        ) : (
          <>
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            New chat
          </>
        )}
      </button>
    </div>
  );
}

export default Navbar;
