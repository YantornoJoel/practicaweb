import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import axiosCreate from './axiosCreate'


export default class CreateAdmin extends Component {
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
        documento: ""
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
            documento: this.state.documento

        };

        if (this.state.password === this.state.confirmpassword) {
            await axios.post("http://localhost:3900/user/save", newUser);
            console.log(this.state)
            this.props.history.push("/admin");
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

                <body className="body-admin">
                    <div className="form form-admin-create mt-5">
                        <form className="login-form" onSubmit={this.onSubmit}>
                            <h2 className="text-white text-center mt-3">Crear cuenta</h2>
                            <hr className="linea-datos mb-5" />

                            <div className="form-group container d-inline-flex" >

                                <input type="text" className="form-control " name="name" placeholder="Nombre" onChange={this.onInputChange}
                                    value={this.state.name}
                                    required />

                                <input type="apellido" className="form-control ml-5 " name="apellido" placeholder="Apellido" onChange={this.onInputChange}
                                    value={this.state.apellido}
                                    required />

                                <input type="email" className="form-control ml-5 " name="email" placeholder="Email" onChange={this.onInputChange}
                                    value={this.state.email}
                                    required />

                            </div>
                            <div className="form-group container d-inline-flex">
                                <input type="text" className="form-control " name="telefono" placeholder="Telefono" onChange={this.onInputChange}
                                    value={this.state.telefono}
                                    required />

                                <input type="text" className="form-control ml-5" name="pais" placeholder="País" onChange={this.onInputChange}
                                    value={this.state.pais}
                                    required />



                                <input type="text" className="form-control ml-5 " name="provincia" placeholder="Provincia" onChange={this.onInputChange}
                                    value={this.state.provincia}
                                    required />

                            </div>
                            <div className="form-group container d-inline-flex">
                                <input type="text" className="form-control " name="documento" placeholder="Documento" onChange={this.onInputChange}
                                    value={this.state.documento}
                                    required />

                                <input type="password" className="form-control ml-5 " name="password" placeholder="Contraseña" onChange={this.onInputChange}
                                    value={this.state.password}
                                    required />

                                <input type="password" className="form-control ml-5" name="confirmpassword" placeholder="Confirmar contraseña" onChange={this.onInputChange}
                                    value={this.state.confirmpassword}
                                    required />
                            </div>


                            <button type="submit" name="button">Crear cuenta</button>
                            <p className="options">Ya tenes cuenta? <Link to="/admin">Inicia sesión</Link></p>

                        </form>
                    </div>
                </body>

            </Fragment>
        )
    }
}
