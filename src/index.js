import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import AppProvider from "./AppContext";

const firebaseConfig = {
  apiKey: "AIzaSyBz_hZeCxrd0RiCDaybL6U_zc7x-tLQrFY",
  authDomain: "closeai-9bd83.firebaseapp.com",
  projectId: "closeai-9bd83",
  storageBucket: "closeai-9bd83.appspot.com",
  messagingSenderId: "616375839503",
  appId: "1:616375839503:web:e1d7817dd0656c052aec7a",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppProvider>
    <App />
  </AppProvider>
);
