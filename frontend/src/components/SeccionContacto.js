import React, { Component, Fragment } from 'react'

export default class SeccionContacto extends Component {
    state= {
        datosreserva: ""
    }

    componentDidMount(){
        this.setState({datosreserva: localStorage.getItem("listadoreserva")})
        var lista = this.state.useremail
        
    }


    render() {
        // var listadoReserva = []
        // listadoReserva = localStorage.getItem("listadoreserva")
        return (
            <Fragment>
                <div className="content">
                    <h1>....</h1>
                    <h2>{this.state.datosreserva}</h2>
                </div>
            </Fragment>
        )
    }
}
