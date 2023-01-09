import React, { useState } from 'react'
import Header from './components/Header/Header';
import Router from './Router';
import "../src/assets/scss/styles.scss"
import AppContext from './context/AppContext';
import { Footer } from './components/Footer';

function App() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        open: open,
        setOpen: setOpen,
        handleClick: handleClick,
        handleClose: handleClose
      }}
    >
      <div className='site-body'>
        <Header />
        <main>
          <Router />
        </main>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default App;
