import React from "react";
import ReactDOM from "react-dom/client";
import "./scss/styles.scss";
import "bootstrap";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { RouteComponent } from "./features/common/components/RouteComponent/RouteComponent.tsx";


ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouteComponent />
        </Provider>
    </React.StrictMode>
);
