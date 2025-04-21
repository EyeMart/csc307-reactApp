// src/main.jsx
import React from "react";
import ReactDOMClient from "react-dom/client";
import MyApp from "./MyApp";
import "./main.css";

// Create the container so other components can add to the root later 
const container = document.getElementById("root");

// Create a root to put at the top of the overall architechture.
const root = ReactDOMClient.createRoot(container);

// Initial render: Render an element to the Root
root.render(<MyApp />);