import { forwardRef, useEffect, useMemo } from "react";
import { AppContextGlobal } from "../../AppContext";
import styles from "./Main.module.css";

const iconExample = (
  <svg
    stroke="#fff"
    fill="#343541"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const iconCapabilities = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    aria-hidden="true"
    height="1em"
    width="1em"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
    ></path>
  </svg>
);

const iconLimitation = (
  <svg
    stroke="currentColor"
    fill="none"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

function ColumnDescription({ type, data, icon, title }, ref) {
  const { setCustomerMessage, customerMessage, setInputStyle } =
    AppContextGlobal();

  useEffect(() => {
    if (!ref?.current?.scrollHeight) return;

    setInputStyle({
      height: ref?.current?.scrollHeight,
    });
  }, [ref, ref?.current?.scrollHeight, setInputStyle, customerMessage]);

  const renderItem = useMemo(() => {
    if (type === "examples")
      return data.map((item) => (
        <button
          key={item}
          onClick={() => {
            setCustomerMessage(item.replace(/"/g, ""));
          }}
          className={`${styles.item} ${styles.item_hover} pre-line cursor-pointer`}
        >
          {item + " →"}
        </button>
      ));

    return data.map((item) => (
      <li key={item} className={`${styles.item} pre-line`}>
        {item}
      </li>
    ));
  }, [data, setCustomerMessage, type]);

  const renderIcon = useMemo(() => {
    switch (type) {
      case "examples":
        return iconExample;
      case "capabilities":
        return iconCapabilities;
      case "limitations":
        return iconLimitation;
      default:
        return iconExample;
    }
  }, [type]);

  return (
    <div className={`${styles.column_description} ${styles.wrapper_examples}`}>
      <h2 className={styles.header_description}>
        {renderIcon}
        <span>{title}</span>
      </h2>
      <ul className={styles.list_items}>{renderItem}</ul>
    </div>
  );
}

export default forwardRef(ColumnDescription);
