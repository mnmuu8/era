import React from 'react'
import Header from './components/Header/Header';
import Router from './Router';
import "../src/assets/scss/styles.scss"
import AppContext from './context/AppContext';

function App() {
  const [open, setOpen] = React.useState(false);

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
      <>
        <Header />
        <main>
          <Router />
        </main>
      </>
    </AppContext.Provider>
  );
}

export default App;
