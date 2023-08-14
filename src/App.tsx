import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppRouter from "./AppRouter";
import Header from "./components/HeaderComponent";

function App() {
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
