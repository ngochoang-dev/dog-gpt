import { AppContextGlobal } from "../../AppContext";
import styles from "./Navbar.module.css";
import { typeMessage } from "../../App";
import { useEffect, useState } from "react";
import { ref, onValue, getDatabase, set } from "firebase/database";

function Navbar() {
  const {
    isTyping,
    setTyping,
    isTyped,
    data,
    openNav,
    setOpenNav,
    titleNav,
    setTitleNav,
  } = AppContextGlobal();
  const [like, setLike] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const flyingHeart = () => {
    const heartLeftElm = document.querySelector("#heart-left");
    const heartRightElm = document.querySelector("#heart-right");

    const flyingHeartLeft = document.createElement("div");
    const flyingHeartRight = document.createElement("div");

    flyingHeartLeft.classList.add("flying-heart-left");
    flyingHeartRight.classList.add("flying-heart-right");

    heartLeftElm.appendChild(flyingHeartLeft);
    heartRightElm.appendChild(flyingHeartRight);

    setTimeout(() => {
      flyingHeart.remove();
    }, 4000);
  };

  const db = getDatabase();
  const handleFavourites = async () => {
    let numCores = navigator.hardwareConcurrency;
    set(ref(db, "favourites/" + numCores), {
      user: `user-${numCores + 1}`,
    });
  };

  useEffect(() => {
    const starCountRef = ref(db, "favourites");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setLike(data);
      setLoading(false);
    });
  }, [db]);

  return (
    <>
      {openNav && (
        <div className={styles.overlay} onClick={() => setOpenNav(false)} />
      )}
      <div
        style={
          openNav
            ? {
                left: 0,
              }
            : {}
        }
        className={styles.wrapper_nav}
      >
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
        <div className={styles.wrapper_favourites}>
          <div className={styles.heart}>
            <div id="heart-left" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="32"
              fill="red"
              className="bi bi-heart-fill cursor-pointer"
              viewBox="0 0 16 16"
              onClick={() => {
                handleFavourites();
                flyingHeart();
              }}
            >
              <path
                fillRule="evenodd"
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
              />
            </svg>
            <div id="heart-right" />
          </div>
          {loading ? (
            <div className="loader">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          ) : (
            <span>( {(like && Object.keys(like)?.length) || 0} )</span>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
