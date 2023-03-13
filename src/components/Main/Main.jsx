import ColumnDescription from "./ColumnDescription";
import styles from "./Main.module.css";
import { forwardRef, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import Conversation from "./Conversation";
import { db } from "../..";
import { collection, addDoc } from "firebase/firestore";
import { AppContextGlobal } from "../../AppContext";
import { getDevices, typeMessage } from "../../App";

const botMessage = [
  "Gâu gâu. Gâu gâu gâu gâu gâu gâu gâu gâu gâu gâu gâu, gâu gâu gâu gâu gâu gâu.",
  "Gâu gâu gâu gâu gâu gâu gâu gâu gâu gâu gâu, gâu gâu gâu gâu gâu gâu gâu gâu gâu gâu gâu gâu gâu gâu gâu gâu gâu gâu.",
  "Gâu gâu gâu gâu gâu gâu gâu gâu gâu gâu gâu, gâu gâu gâu gâu gâu gâu gâu gâu gâu gâu gâu gâu gâu gâu gâu gâu gâu gâu.",
  "Gâu gâu :v.",
  "Gâu. Gâu gâu gâu gâu gâu gâu gâu gâu gâu gâu gâu, gâu gâu gâu gâu gâu gâu gâu gâu gâu gâu gâu gâu gâu gâu gâu gâu gâu gâu.",
];

const iconSend = (
  <svg
    stroke="rgba(142,142,160,1)"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    height="16px"
    width="16px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

const dataExamples = [
  `"Explain quantum computing in simple terms"`,
  `"Got any creative ideas for a 10 year old’s birthday?"`,
  `"How do I make an HTTP request in Javascript?"`,
];

const dataCapabilities = [
  "Remembers what user said earlier in the conversation",
  "Allows user to provide follow-up corrections",
  "Trained to decline inappropriate requests",
];

const dataLimitations = [
  "May occasionally generate incorrect information",
  "May occasionally produce harmful instructions or biased content",
  "Limited knowledge of world and events after 2021",
];

function Main() {
  const inputRef = useRef(null);
  const {
    setOpenNav,
    customerMessage,
    setCustomerMessage,
    setIsTyped,
    data,
    setData,
    titleNav,
    isTyping,
    inputStyle,
    setInputStyle,
    handleClearData,
    allowSubmit,
    setAllowSubmit,
  } = AppContextGlobal();

  const beforeTyping = (id, i, message) => {
    setIsTyped(false);
    setAllowSubmit(false);
    setData((prev) => {
      const hasMessage = prev.some((e) => e.id === id);

      if (!hasMessage) {
        return [
          ...prev,
          {
            id,
            type: "bot",
            content: message[i - 1],
            isTyping: true,
          },
        ];
      }

      const newData = prev.map((item) => {
        if (item.id === id) {
          item.content = item.content.concat(message[i - 1]);
          item.isTyping = true;
        }
        return item;
      });

      return newData;
    });
  };

  const afterTyping = () => {
    setIsTyped(true);
    setAllowSubmit(true);
    setData((prev) => {
      return prev.map((el) => {
        if (el.isTyping) {
          el.isTyping = false;
        }
        return el;
      });
    });
  };

  const getDate = () => {
    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();

    // thêm số 0 vào phía trước nếu giá trị nhỏ hơn 10
    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    let amPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // Nếu giờ là 0 thì sẽ được chuyển thành 12

    let formattedDate =
      day +
      "/" +
      month +
      "/" +
      year +
      " : " +
      hours +
      ":" +
      minutes +
      " " +
      amPm;

    return formattedDate;
  };

  const handleSubmitChat = async (e) => {
    e.preventDefault();

    if (!allowSubmit || !customerMessage) return;
    const randomNumber = Math.floor(Math.random() * 5);

    const message = {
      id: uuidv4(),
      type: "customer",
      content: customerMessage,
      isTyping: false,
    };

    setData([...data, message]);
    typeMessage(botMessage[randomNumber], 100, beforeTyping, afterTyping);
    setCustomerMessage("");
    setInputStyle({});
    await addDoc(collection(db, "customers"), {
      user: getDevices(),
      content: customerMessage,
      created_at: getDate(),
    });
  };

  const handleChangeInput = (e) => {
    setInputStyle({
      height: e.target.scrollHeight,
    });
    setCustomerMessage(e.target.value);
  };

  return (
    <>
      <header>
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
          height="1.5rem"
          width="1.5rem"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => setOpenNav((prev) => !prev)}
        >
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
        {titleNav ? (
          <span>
            {titleNav} {isTyping && <span className="typing nav-typing" />}
          </span>
        ) : (
          <span>New chat</span>
        )}

        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          height="1.5em"
          width="1.5em"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => {
            handleClearData();
          }}
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </header>
      <div className={styles.wrapper_main}>
        {!data.length ? (
          <StartScreen ref={inputRef} />
        ) : (
          <Conversation data={data} />
        )}

        <div className={styles.wrapper_operation}>
          <form className={styles.form_chat} onSubmit={handleSubmitChat}>
            <div className={styles.wrapper_input} style={inputStyle}>
              <textarea
                ref={inputRef}
                className={styles.input_text}
                value={customerMessage}
                onChange={handleChangeInput}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSubmitChat(event);
                  }
                }}
              ></textarea>
              <button
                className={`${styles.btn_send}  ${
                  allowSubmit ? "send-hover cursor-pointer" : ""
                }`}
              >
                {allowSubmit ? (
                  iconSend
                ) : (
                  <div className="loader">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                )}
              </button>
            </div>
          </form>
          <div className={styles.short_description}>
            <a href="/" target="_blank" rel="noopener noreferrer">
              DogGPT Feb 13 Version
            </a>
            . Free Research Preview. Our goal is to make AI systems more natural
            and safe to interact with. Your feedback will help us improve.
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;

const StartScreen = forwardRef((_, ref) => {
  return (
    <div className={styles.wrapper_start}>
      <div className="flex">
        <h1 className={styles.title_header}>DogGPT</h1>
      </div>
      <div className={styles.wrapper_description}>
        <ColumnDescription
          title="Examples"
          type="examples"
          data={dataExamples}
          ref={ref}
        />
        <ColumnDescription
          title="Capabilities"
          type="capabilities"
          data={dataCapabilities}
        />
        <ColumnDescription
          title="Limitations"
          type="limitations"
          data={dataLimitations}
        />
      </div>
    </div>
  );
});
