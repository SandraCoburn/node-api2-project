import React from "react";
import Posts from "./Posts";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1> Posts</h1>
        <h3>Welcome to Posts</h3>
        <Posts />
      </header>
    </div>
  );
}

export default App;
