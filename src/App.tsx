import React from "react";
import LayoutProvider from "./context/LayoutContext";
import LayoutComponent from "./components/wireframe/layout/LayoutComponent";
import "./index.css";

export default function App() {
  return (
    <LayoutProvider>
      <LayoutComponent />
    </LayoutProvider>
  );
}
