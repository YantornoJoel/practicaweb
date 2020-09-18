import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../App.css'
import '../assets/style.css'
import { __RouterContext } from 'react-router'







export default class UserList extends Component {






    state = {
        users: [],
        usersCliente: [],
        list: false
    }

    componentDidMount() {
        this.setState({ list: true })
        // this.getUsers()
        this.getUsersCliente()

    }

    componentWillUnmount() {
        this.setState({ list: false })
    }



    getUsers = async () => {

        const res = await axios.get("http://localhost:3900/userCliente/allusers/");
        this.setState({ users: res.data.users });
        console.log(res.data.users)

    }

    deleteUser = async (id) => {
        await axios.delete('http://localhost:3900/userCliente/delete/' + id)
        this.getUsers();
    }


    // ---------------------------
    getUsersCliente = async () => {
        if (localStorage.getItem('borrarusuario')) {
            const res = await axios.get("http://localhost:3900/userCliente/allusers/")
            this.setState({ users: res.data.users });
            console.log(res.data.users)
        }

    }











    render() {

        if (localStorage.getItem('borrarusuario')) {
            return (
                <Fragment>
                    <div className="content">
                        <h1 className="text-center">Lista de usuarios</h1>
                        <hr className="mb-5" />
                        <div className="">
                            {this.state.users.map(user => (
                                <div className="listado-usuario-cliente " key={user._id}>
                                    <h6 id="list-nombre">
                                        {user.name}
                                    </h6>
                                    <h6 id="list-apellido">
                                        {user.apellido}
                                    </h6>

                                    <h6 id="list-email">{user.email}</h6>
                                    <h6 id="list-telefono">{user.telefono}</h6>
                                    <button
                                        id="list-boton"
                                        className=" btn btn-admin-listuser-delete   btn-listado-cliente"
                                        onClick={() => this.deleteUser(user._id)}>
                                        Borrar usuario
                                           </button>
                                    <h1 className="linea-hr-admin"></h1>
                                </div>

                            ))}

                        </div>
                    </div>

                </Fragment>
            )
        } else {
            return (null)
        }
    }
}
