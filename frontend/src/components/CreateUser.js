import React, { Component, Fragment } from 'react'
import axios from "axios";
// import { Link } from "react-router-dom";
import '../App.css';


export default class CreateUser extends Component {

    // Se crea un estado para ir asignandole valores
    state = {
        name: "",
        apellido: "",
        email: "",
        telefono: "",
        password: "",
        confirmpassword: "",
        pais: "",
        provincia: "",
        documento: "",
        cp: ""
    };


    //Evento creado para asignarlo al formulario cuando se envia
    onSubmit = async (e) => {
        e.preventDefault(); //Evento por defecto que evita que la pagina se recargue
        const newUser = {
            name: this.state.name,
            apellido: this.state.apellido,
            email: this.state.email,
            password: this.state.password,
            confirmpassword: this.state.confirmpassword,
            telefono: this.state.telefono,
            pais: this.state.pais,
            provincia: this.state.provincia,
            documento: this.state.documento,
            cp: this.state.cp

        };

        if (this.state.password === this.state.confirmpassword) {
            await axios.post("http://localhost:3900/userCliente/save", newUser);
            console.log(this.state)
            this.props.history.push("/api");
        } else {
            alert("Las contraseñas no coinciden")

        }

    };

    //Actualiza el estado con los valores ingresados en el body
    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });

    };






    render() {
        return (
            <Fragment>

                <div className="row pt-5 login">
                    <div className="col-md-4 mx-auto login">
                        <div className="card mt-4 text-center login-menu">
                            <div className="card-header">
                                <h1>Crear Usuario</h1>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="name" placeholder="Nombre" onChange={this.onInputChange}
                                            value={this.state.name}
                                            required />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="apellido" placeholder="Apellido" onChange={this.onInputChange}
                                            value={this.state.apellido}
                                            required />
                                    </div>
                                    <div className="form-group">
                                        <input type="email" className="form-control" name="email" placeholder="Email" onChange={this.onInputChange}
                                            value={this.state.email}
                                            required />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="telefono" placeholder="Telefono" onChange={this.onInputChange}
                                            value={this.state.telefono}
                                            required />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="pais" placeholder="País" onChange={this.onInputChange}
                                            value={this.state.pais}
                                            required />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="provincia" placeholder="Provincia" onChange={this.onInputChange}
                                            value={this.state.provincia}
                                            required />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="cp" placeholder="Código Postal" onChange={this.onInputChange}
                                            value={this.state.cp}
                                            required />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="documento" placeholder="Documento" onChange={this.onInputChange}
                                            value={this.state.documento}
                                            required />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" name="password" placeholder="Contraseña" onChange={this.onInputChange}
                                            value={this.state.password}
                                            required />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" name="confirmpassword" placeholder="Confirmar contraseña" onChange={this.onInputChange}
                                            value={this.state.confirmpassword}
                                            required />
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-success btn-block">Crear</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
