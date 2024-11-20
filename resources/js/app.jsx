import "./bootstrap";
import "../css/app.css";

import ReactDOM from "react-dom/client";
import Home from "./Home";
import React from "react";

ReactDOM.createRoot(document.getElementById("app")).render(
    <React.StrictMode>
<Home />
    </React.StrictMode>
);