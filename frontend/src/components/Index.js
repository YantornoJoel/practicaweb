import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'


export default class Index extends Component {
    render() {
        return (
            <Fragment>
                <div className="container">
                    <div className="jumbotron mt-4">

                        <h1 className="display-4">Nombre del software, nombre de empresa</h1>
                        <p className="lead">Subtitulo.</p>
                        <hr className="my-4" />
                        <p>Texto de ejemplo: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam itaque repellat voluptatem neque molestias iste vel nulla unde repellendus non explicabo aperiam est veritatis laborum corrupti, inventore eligendi ab iure!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam itaque repellat voluptatem neque molestias iste vel nulla unde repellendus non explicabo aperiam est veritatis laborum corrupti, inventore eligendi ab iure!</p>
                        <Link to="/api/productlist" className="btn btn-dark btn-lg">Ver productos</Link>
                    </div>
                </div>
            </Fragment>
        )
    }
}
