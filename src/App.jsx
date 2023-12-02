import * as React from 'react';
import { useState, useEffect } from 'react'
import { Container, Snackbar } from '@mui/material'
import MuiAlert from '@mui/material/Alert';

import Header from './components/Header'
import SendTweet from './components/SendTweet'
import ListTweets from './components/ListTweets';

import { TWEETS_STORAGE } from './utils/contants';



function App() {
  let [toastProps, set_toastProps] = useState({
    open: false,
    message: null,
    type: "error", 
  })

  let [allTweetsStorage, set_allTweetsStorage] = useState([])
  let [reloadApp, set_reloadApp] = useState(false)

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    set_toastProps({ open: false, message: "", type: "error" });
  };

  useEffect(function() {
    set_allTweetsStorage(JSON.parse(localStorage.getItem(TWEETS_STORAGE)))
    set_reloadApp(false)
  }, [reloadApp])
  
  function deleteTweet(index) {
    allTweetsStorage.splice(index, 1)
    set_allTweetsStorage(allTweetsStorage)
    localStorage.setItem(TWEETS_STORAGE, JSON.stringify(allTweetsStorage))
    set_reloadApp(true)
  }


  return (
    <Container className='tweets-simulator'>
      <Header /> {/* Cabecera de la app: logo, titulo */}

      <SendTweet 
        set_toastProps={set_toastProps} // Definir propiedades del toast desde el envio del tweet
        allTweetsStorage={allTweetsStorage}
        set_reloadApp={set_reloadApp}
      /> {/* Botón de +, formulario y logica de envio de tweet */}

      <ListTweets 
        allTweetsStorage={allTweetsStorage} 
        deleteTweet={deleteTweet}
      />

      <Snackbar 
        open={toastProps.open}
        anchorOrigin={{
          vertical: "bottom", 
          horizontal: "left"
        }}
        autoHideDuration={4000} 
        onClose={handleClose} 
      >
        {
          (toastProps.type == "error") ? <Alert 
              severity="error" 
              sx={{ width: '100%' }}
              onClose={handleClose} // Botón de cerrar, pero es obligatorio o si no, no cierra en el tiempo que uno le puso
            >
              {toastProps.message}
            </Alert>
          : 
            <Alert 
              severity="success" 
              sx={{ width: '100%' }}
              onClose={handleClose} // Botón de cerrar, pero es obligatorio o si no, no cierra en el tiempo que uno le puso
            >
              {toastProps.message}
            </Alert>
        }
      </Snackbar>
    </Container>
  )
}

export default App
