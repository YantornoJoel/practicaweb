import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios'
import axiosCreate from './axiosCreate'


export default class LoginAdmin extends Component {
    state = {
        email: "",
        password: "", 
        valortoken: ""

    };

    onSubmit = async (e) => {
        e.preventDefault(); //Evento por defecto que evita que la pagina se recargue
        const loginUser = {
            email: this.state.email,
            password: this.state.password
        };


        if (loginUser.email  && loginUser.password ) {
            try{

           const res = await axios.post("http://localhost:3900/user/signin", loginUser);
          
            const entoken= res.data.token
            localStorage.setItem('token', entoken)
            this.props.history.push("/admin/user");
            localStorage.setItem('borrarusuario', true)
            axiosCreate('/perfil/1', {headers: {'token' : localStorage.getItem('token')}})
            }catch(err){
            
                alert("Email y/o contraseña incorrectos")
            }

         
        } else { 
           alert("Email y/o contraseña incompletos")     
           
        }
    };


    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }



    render() {
        return (
            <Fragment>
                <body className="body-admin">
                <div className="form">
            <form className="login-form" onSubmit={this.onSubmit}>
            <h2 className="text-white text-center mt-3">Login</h2>
            <hr className="linea-datos mb-5" />
           
            <input type="email" name="email" placeholder="Email" onChange={this.onInputChange} />
            <input type="password" name="password" placeholder="Contraseña" onChange={this.onInputChange}/>
            <button type="submit" name="button">Iniciar sesión</button>
            <p className="options">No tenes cuenta? <Link to="/create/admin">Crea una</Link></p>
            </form>
        </div>
        </body>
            </Fragment>
        )
    }
}
