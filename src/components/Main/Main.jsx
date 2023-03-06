import ColumnDescription from "./ColumnDescription";
import styles from "./Main.module.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Conversation from "./Conversation";
import { db } from "../..";
import { collection, addDoc } from "firebase/firestore";
import { AppContextGlobal } from "../../AppContext";
import { typeMessage } from "../../App";

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
  `"Explain quantum computing in simple terms" →`,
  `"Got any creative ideas for a 10 year old’s birthday?" →`,
  `"How do I make an HTTP request in Javascript?" →`,
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
  const { customerMessage, setCustomerMessage, setIsTyped, data, setData } =
    AppContextGlobal();
  const [allowSubmit, setAllowSubmit] = useState(true);

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

  const getDevices = () => {
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

  const handleSubmitChat = async (e) => {
    e.preventDefault();
    if (!allowSubmit) return;
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

    await addDoc(collection(db, "customers"), {
      user: getDevices(),
      content: customerMessage,
    });
  };

  return (
    <div className={styles.wrapper_main}>
      {!data.length ? <StartScreen /> : <Conversation data={data} />}

      <div className={styles.wrapper_operation}>
        <form className={styles.form_chat} onSubmit={handleSubmitChat}>
          <div className={styles.wrapper_input}>
            <textarea
              className={styles.input_text}
              value={customerMessage}
              onChange={(e) => setCustomerMessage(e.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSubmitChat(event);
                }
              }}
            ></textarea>
            <button
              className={`${styles.btn_send}  ${
                allowSubmit ? "send-hover cursor-pointer" : ""
              }}`}
            >
              {allowSubmit ? (
                iconSend
              ) : (
                <div class="loader">
                  <div class="dot"></div>
                  <div class="dot"></div>
                  <div class="dot"></div>
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
  );
}

export default Main;

function StartScreen() {
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
}
