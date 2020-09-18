import React, { Component } from 'react'
import $ from 'jquery';


export default class Configuracion extends Component {
    onSubmit =  () => {
         $("#btnInvertirColores").click(function(){
        // Asigna o desasigna la clase black
        $("body").toggleClass('modooscuro-body');
        $("#usuario").toggleClass('modooscuro-sidebar');
        $(".sidebar span ").toggleClass('modooscuro-sidebar');
        $(".sidebar i ").toggleClass('modooscuro-sidebar');
        $("header").toggleClass('modooscuro-content')
        
    })
    }
    render() {
        return (
            <div className="content">
                <h1> Hola </h1>
                  <button className="btn btn-success" onClick={this.onSubmit} type="submit" id="btnInvertirColores" value="Invertir colores">
                      Boton
                      </button>
            </div>
        )
    }
}
