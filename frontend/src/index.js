import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from 'react-redux';
import store from './store/store'
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ErrorBoundary } from "react-error-boundary";

// import { AuthContextProvider } from "./store/auth-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ErrorBoundary>
        <Provider store={store}>
            <App />
        </Provider>

    </ErrorBoundary>

   
);

reportWebVitals();
