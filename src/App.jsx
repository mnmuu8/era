import React from 'react'
import Header from './components/Header/Header';
import Router from './Router';
import "../src/assets/scss/styles.scss"

function App() {
  return (
    <>
      <Header />
      <main>
        <Router />
      </main>
    </>
  );
}

export default App;
