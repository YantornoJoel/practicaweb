import React, { Component, Fragment } from 'react'
import { Link, Redirect } from "react-router-dom";


import axiosCreate from './axiosCreate'
import axiosCreateUser from './axiosCreateUser'
// import { createHashHistory } from 'history'
// export const history = createHashHistory()


export default class Nav extends Component {

    state = {
        email: "",
        token: false
    }


    async componentDidMount() {


        const token = localStorage.getItem('token')
        console.log("El valor del token obtenido es: ", token)


        // await axiosCreate('/perfil/1', { headers: { 'token': localStorage.getItem('token') } })
        //     .then((res) => {

        //         this.setState({
        //             email: res.data.email,
        //             token: true
        //         })
        //     }).catch((err) => { console.log("El error es :", err) })

            await axiosCreateUser('/perfil/1', { headers: { 'token': localStorage.getItem('token') } })
            .then((res) => {

                this.setState({
                    email: res.data.email,
                    token: true
                })
            }).catch((err) => { console.log("El error es :", err) })
           
           
    }

    onSubmit = async (e) => {
        e.preventDefault();
        localStorage.removeItem('token')
        localStorage.removeItem('borrarusuario')
    }


    render() {

        return (
            <Fragment>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container">
                        <Link className="navbar-brand " to="/api/perfil">App</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/api/">Inicio <span className="sr-only">(current)</span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/api/userlist">Acerca de</Link>
                                </li>
                            </ul>
                            <ul className="navbar-nav ml-auto">
                                {/* <li className="nav">
                                    <Link className="nav-link" to="/perfil">{this.state.email}</Link>
                                </li> */}

                                <li className="nav-item dropdown ">
                                    <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {this.state.email}
                                    </Link>
                                    <div className="dropdown-menu " aria-labelledby="navbarDropdown">
                                        <button className="dropdown-item nav-user">
                                            <Link className="dropdown-item nav-user" to="/api/perfil">Ver perfil</Link>
                                        </button>
                                        <div className="dropdown-divider"></div>

                                        <form onSubmit={this.onSubmit}>
                                            {/* <Link to="/Joel" type="submit">Cerrar</Link> */}
                                            <button type="submit" className="dropdown-item nav-user" onClick={this.onSubmit}>
                                                <Link className="dropdown-item nav-user" to="/api/" type="submit">Cerrar sesión</Link>
                                            </button>
                                        </form>

                                        {/* <button type="submit" className="dropdown-item" onClick={this.onSubmit}  >Cerrar Sesión</button> */}
                                        {/* btn btn-dark nav-link */}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav >
            </Fragment >
        )



    }
}
