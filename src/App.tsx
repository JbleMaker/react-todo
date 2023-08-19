import React from "react";
import { createGlobalStyle } from "styled-components";
import ToDoList from "./components/ToDoList";

const GlobalStryle = createGlobalStyle`
  
`;

function App() {
  return (
    <>
      <GlobalStryle />
      <ToDoList />
    </>
  );
}

export default App;
