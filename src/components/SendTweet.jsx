import { useState } from "react"
import { Fab } from "@mui/material"
import { Add } from "@mui/icons-material"
import moment from "moment/moment"

import ModalContainer from "./ModalContainer"
import Form from "./Form"

import "./SendTweet.scss"
import { TWEETS_STORAGE } from "../utils/contants"




export default function SendTweet({
  set_toastProps, allTweetsStorage, set_reloadApp
}) {
  let [isOpenModal, set_isOpenModal] = useState(false)

  let openModal = function() {
    set_isOpenModal(true)
  }
  let closeModal = function() {
    set_isOpenModal(false)
  }

  function sendTweet(event, formValue) {
    event.preventDefault()
    
    let allTweetsArray = [] // Variable contenedora temporal. Sirve para contener los nuevos datos del formulario para despues guardarlos en el Local Storage

    if(allTweetsStorage != null || allTweetsStorage != undefined) {
      allTweetsArray = allTweetsStorage
    }
    
    if(!formValue.username || !formValue.tweet) {
      set_toastProps({ open: true, message: "¡Warning! Es obligatorio llenar todos los campos", type: "error" })
    } 
    else {
      formValue.time = moment() // Estamos creando una propiedad time
      allTweetsArray.push(formValue)
      localStorage.setItem(TWEETS_STORAGE, JSON.stringify(allTweetsArray)) // Agrega un valor al localStorage, es como un .push()
   
      closeModal()

      set_toastProps({ open: true, message: "Tweet enviado correctamente", type: "sucess" })

      allTweetsArray = []
    }
  }


  return (
    <div className="send-tweet">
      <Fab 
        className="send-tweet__button-open-form" 
        color="primary"
        aria-label="add"
        onClick={openModal}

      > {/* Botón para abrir modal que contiene formulario */}
        <Add />
      </Fab>


      <ModalContainer
        isOpenModal={isOpenModal}
        closeModal={closeModal}
      > {/* Ventana oscura que se pone delante de todo */}
        <Form 
          sendTweet={sendTweet}
          set_reloadApp={set_reloadApp}
        /> {/* Formulario para escribir el tweet */}
      </ModalContainer>
    </div>
  )
}
