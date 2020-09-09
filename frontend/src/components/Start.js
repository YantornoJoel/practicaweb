import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import '../assets/style.css'

export default class Start extends Component {
    render() {
        return (
            <Fragment>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css"></link>

                <div className="row text-center start-cards container ">


                    <div className="col-md-5  start-card-item">
                        <Link to="/api" id="start-link">
                            <i class="fas fa-tools" id="icono-herramienta"></i>
                            <h3>USUARIO</h3>
                            <hr />
                            <p>Ejemplo de texto en el que se pone una descripcion de que se puede hacer con cada tipo de usuario</p>
                            <img src="" /> <i class="fas fa-user-circle" id="icono-usuario"></i>

                        </Link>
                    </div>

                    <div className="col-md-5 start-card-item">
                        <Link to="/admin"  id="start-link">
                            <i class="fas fa-tools" id="icono-herramienta"></i>
                            <h3>ADMINISTRADOR</h3>
                            <hr />
                            <p>Ejemplo de texto en el que se pone una descripcion de que se puede hacer con cada tipo de usuario</p>
                            <i class="fas fa-user-cog" id="icono-usuario"></i>
                        </Link>
                    </div>
                </div>

            </Fragment>
        )
    }
}
