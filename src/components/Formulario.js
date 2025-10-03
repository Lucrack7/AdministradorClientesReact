import React, {Fragment, useState} from "react";
import shortid from "shortid";
import  PropTypes from 'prop-types';



const Formulario = ({crearCita}) => {

    // crear State de citas
    const [cita, actualizarCita] = useState({
        mascota: "",
        propietario: "",
        fecha: "",
        hora: "",
        sintomas: "",
    });

    const [error, actualizarError]  = useState(false);

    // funcion que se ejecuta cada vez que el usuario escribe un input
    const actualizarState = e => {
        actualizarCita({
            ...cita, 
            [e.target.name]: e.target.value
        });
    }
    
    // Extraer los valores
    const {mascota, propietario, fecha, hora, sintomas} = cita;

    // cuando el usuario presiona agregar cita
    const  submitCita = e =>{
        e.preventDefault();

        // Validar
        if (mascota === "" || propietario === "" || fecha === "" || hora==="" || sintomas=== "") {
            
            actualizarError(true)
            return;
        }

        // eliminar mensaje previo
        actualizarError(false)

        // Asignar un ID
        cita.id = shortid.generate();

        // crear la cita
        crearCita(cita);

        // reiniciar el form
        actualizarCita({
            mascota: "",
            propietario: "",
            fecha: "",
            hora: "",
            sintomas: "",
        })
    }
    
    return ( 
        <Fragment>
            <h2>Crear Cita</h2>

            {error ?  <p className="alerta-error">Todos los campos son obligatorios</p>  : null}

            <form
                onSubmit={submitCita}
            >
                <label>Nombre de la Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre de la Mascota"
                    onChange={actualizarState}
                    value={mascota}
                />

                <label>Nombre del Dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre del Dueño"
                    onChange={actualizarState}
                    value={propietario}
                />

                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />

                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />

                <label>Síntomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>
            </form>
        </Fragment>
    );
}


Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario;