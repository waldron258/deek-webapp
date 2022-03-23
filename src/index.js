import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import i18next from "i18next";
import common_es from "./Translation/es/common.json";
import common_en from "./Translation/en/common.json";
import "./firebase";

if (localStorage.getItem("language") === null) {
  localStorage.setItem("language", "es");
}

i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: localStorage.getItem("language"), // language to use
  resources: {
    en: {
      common: common_en, // 'common' is our custom namespace
    },
    es: {
      common: common_es,
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
