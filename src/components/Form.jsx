import { useState } from "react";
import { FormControl, FormGroup, TextField, Button } from "@mui/material";

import "./Form.scss"



export default function Form({
  sendTweet, set_reloadApp
}) {
  let [formValue, set_formValue] = useState({
    username: "",
    tweet: ""
  })

  function onFormChange(event) { /* Actualizar estado cada vez que cambia el valor de alguno de los inputs del formulario */
    set_formValue({
      ...formValue, // Tomar las propiedades del estado que no se están cambiando y copiarlas en el nuevo objeto
      [event.target.name]: event.target.value // Tomar el valor del  input que se está cambiando con cada tecleada y copiarlo en el nuevo objeto, tomando el name del input como key de la propiedad y referencia y guardarlo ahi.
    })
    console.log(formValue) // Verificar cambio del estado cada vez que se cambia el valor de alguno de los inputs
  }


  return (
    <form 
      className="form"
      onSubmit={function(event) {
        sendTweet(event, formValue)
        set_reloadApp(true) // Esto es para la primera vez que abre el navegador esta pagina, para que se recargue y apzrezca el primer tweet creado
      }}
      onChange={onFormChange}
    >
      <h2 className="form__title">Enviar tweet</h2>
      
      <FormControl>

        <FormGroup>
          <TextField 
            className="form__username"
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            margin="normal"
          />
        </FormGroup>


        <FormGroup>
          <TextField 
            className="form__textarea"
            name="tweet"
            multiline
            rows={3}
            placeholder="Escribe tu tweet"
            margin="normal"
          />
        </FormGroup>


        <FormGroup>
          <Button
            type="submit"
          >
            Enviar
          </Button>
        </FormGroup>

      </FormControl>
    </form>
  )
}