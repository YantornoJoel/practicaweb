import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import axiosCreate from './axiosCreate'
import '../assets/style.css'

export default class SeccionAdmin extends Component {
    state = {
        email: "",
        token: false
    }

    async componentDidMount() {


        // PARTE DE SECCION ADMIN
        const token = localStorage.getItem('token')
        console.log("El valor del token obtenido es: ", token)


        await axiosCreate('/perfil/1', { headers: { 'token': localStorage.getItem('token') } })
            .then((res) => {

                this.setState({
                    email: res.data.email,
                    token: true
                })
            }).catch((err) => { console.log("El error es :", err) })


    }

    componentWillUnmount() {
        this.setState({ list: false })
    }




    onSubmit = async (e) => {
        e.preventDefault();
        localStorage.removeItem('token')
        localStorage.removeItem('borrarusuario')
    }




    render() {
        if (localStorage.getItem('token')) {
            return (
                <Fragment>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css"></link>



                    <input type="checkbox" id="check" />




                    <nav className="navbar navbar-expand-lg navbar-dark  nav-admin">
                        <div className="container">
                            <div class="left_area">
                                <h3>
                                    <span>{this.state.email}</span>
                                    <label for="check">
                                        <i class="fas fa-bars  ml-3" id="nav-label-icon"></i>
                                    </label>
                                </h3>
                            </div>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/api/"><span></span>  <span className="sr-only">(current)</span></Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/api/userlist"></Link>
                                    </li>
                                </ul>
                                <ul className="navbar-nav ml-auto">
                                    {/* <li className="nav">
                                    <Link className="nav-link" to="/perfil">{this.state.email}</Link>
                                </li> */}


                                </ul>
                            </div>
                        </div>
                    </nav >




















                    <div class="sidebar">

                        <center className="mb-5">
                            <img src="" /> <i class="fas fa-user-circle" id="usuario"></i>

                        </center>

                        <div className="menu-lateral">
                        <Link to="/admin/user/list"><i class="fas fa-users"></i><span>Clientes</span></Link>
                        <Link to="/admin/user/product"><i class="fas fa-store-alt"></i><span>Productos</span></Link>
                        <Link to="/admin/user/perfil"><i class="far fa-address-book" title="Perfil"></i><span>Perfil</span></Link>                        <a href="#"><i class="fas fa-envelope-open" title="Contacto"></i><span>Contacto</span></a>
                        <a href="#"><i class="fas fa-info-circle" title="Acerca de"></i><span>Acerca de</span></a>
                        <a href="#"><i class="fas fa-sliders-h" title="Configuraciones"></i><span>Opciones</span></a>
                        <Link onClick={() => {localStorage.removeItem('token')}} to="/admin"><i class="fas fa-sign-out-alt"></i><span>Cerrar sesión</span></Link>
                        </div>

                        
                    </div>

                    <div class="content">




                    </div>

                </Fragment>
            )
        } else {
            return (
                <Link to="/api">Error, no inicio sesión como administrador</Link>
            )
        }
    }
}
