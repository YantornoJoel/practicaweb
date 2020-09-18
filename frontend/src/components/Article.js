import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

import axiosCreateUser from './axiosCreateUser'


export default class Article extends Component {

    state = {
        title: "",
        content: "",
        _id: "",
        marca: "",
        precio: "",
        editing: false,
        date: new Date(),
        login: true,
        reserva: false,
        _idUser: "",
        email: "",
        name: "",
        apellido: "",
        telefono: "",
        pais: "",
        provincia: "",
        documento: "",
        cp: "",


    };
    async componentDidMount() {
        if (this.props.match.params.id) {
            const res = await axios.get(
                "http://localhost:3900/api/article/" + this.props.match.params.id
            );
            console.log(res.data.article);
            this.setState({
                title: res.data.article.title,
                content: res.data.article.content,
                date: new Date(res.data.article.date),
                marca: res.data.article.marca,
                precio: res.data.article.precio,
                editing: true,
                _id: this.props.match.params.id,


            });






            await axiosCreateUser('/perfil/1', { headers: { 'token': localStorage.getItem('token') } })
                .then((res) => {

                    this.setState({
                        name: res.data.name,
                    apellido: res.data.apellido,
                    email: res.data.email,
                    _idUser: res.data._id,
                    telefono: res.data.telefono,
                    pais: res.data.pais,
                    provincia: res.data.provincia,
                    documento: res.data.documento,
                    cp: res.data.cp,
                        token: true
                    })
                }).catch((err) => { console.log("El error es :", err) })





        }
    }

    reservar = () => {
        if (localStorage.getItem('token')) {
            this.setState({ reserva: true })


            var listReserva = [
               
                
                this.state.email,
                this.state.telefono,
                this.state.name,
                this.state.apellido,
                this.state.cp,
                this.state.documento,
                this.state.pais,
                this.state.provincia,
                
            
            ]
            
            
            // var hola= listReserva[0]
            console.log("El email es: ", listReserva)



            localStorage.setItem('listadoreserva', listReserva)
        } else {
            //   alert("Tenes que iniciar sesión para confirmar una reserva")
            this.setState({ login: false })
        }
    }



    render() {
        return (
            <Fragment>
                <div className="container mt-5">
                    <img alt="imagen" />
                    <h3>{this.state.title}</h3>
                    <p>{this.state.content}</p>
                    <p>{this.state.marca}</p>
                    <p>{this.state.precio}</p>
                    <button onClick={this.reservar} className="btn btn-warning">Confirmar Reserva</button>

                </div>


                {!this.state.login &&
                    <div className="container">
                        <div className=" alert alert-danger mt-5 text-center" role="alert">
                            Para poder realizar una reserva se necesita
                       <Link to="/api/signin" className="text-primary"> iniciar sesión </Link>
                       con un usuario registrado.
                  </div>
                    </div>
                }

                {this.state.reserva &&
                    <div className="container">
                        <div className=" alert alert-success mt-5 text-center" role="alert">
                            Reserva confirmada,
                       <Link to="/api" className="text-primary"> volver a inicio </Link>
                            <h2>{this.state.email}</h2>
                            <h2>{this.state.telefono}</h2>
                            <h2>{this.state.name}</h2>
                            <h2>{this.state.apellido}</h2>
                            <h2>{this.state.cp}</h2>
                            <h2>{this.state.documento}</h2>
                            <h2>{this.state.pais}</h2>
                            <h2>{this.state.provincia}</h2>
                        </div>
                    </div>
                }

            </Fragment>
        )
    }
}
