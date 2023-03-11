import ScrollToBottom from "react-scroll-to-bottom";
import styles from "./Main.module.css";

function Conversation({ data }) {
  const pathImg = (type) =>
    type === "bot" ? "/closeai-avatar.png" : "/customer.png";

  return (
    <div className={styles.wrapper_conversation}>
      <ScrollToBottom className={styles.scroll}>
        {data.map((item, i) => (
          <div
            key={i}
            className={`${
              item.type === "bot" ? "" : styles.block_customer_message
            }`}
          >
            <div className={styles.block_message}>
              <div className={styles.avatar}>
                <img src={pathImg(item.type)} alt="customer" />
              </div>
              <p>
                {item.content}
                {item.isTyping && <span className="typing" />}
              </p>
            </div>
          </div>
        ))}
        <div className={styles.bottom} />
      </ScrollToBottom>
    </div>
  );
}

export default Conversation;
