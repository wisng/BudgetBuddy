import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route, Link } from "react-router-dom";
import Login from "./screens/Login.jsx";
import Signup from "./screens/Signup.jsx";
import Home from "./screens/Home.jsx";
import Insights from "./screens/Insights.jsx";
import Transactions from "./screens/Transactions.jsx";
import Wrapper from "./screens/Wrapper.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Wrapper Component={Home} />,
  },
  {
    path: "/insights",
    element: <Wrapper Component={Insights} />,
  },
  {
    path: "/transactions",
    element: <Wrapper Component={Transactions} />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
