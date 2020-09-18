import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import './App.css';

// IMPORTAR COMPONENTES
import CreateUser from './components/CreateUser'
import Nav from './components/Nav'
import NavUser from './components/NavUser'
import Login from './components/Login'
import UserList from './components/UserList'
import Index from './components/Index'
import Product from './components/Product'
import ProductList from './components/ProductList'
import Perfil from './components/Perfil'
import LoginAdmin from './components/LoginAdmin'
import CreateAdmin from './components/CreateAdmin'
import SeccionAdmin from './components/SeccionAdmin'
import SeccionAdminPerfil from './components/SeccionAdminPerfil'
import Start from './components/Start'
import Configuracion from './components/Configuracion'
import SeccionContacto from './components/SeccionContacto'
import SeccionAcercade from './components/SeccionAcercade'
import UploadImage from './components/UploadImage'
import Article from './components/Article'



function App() {
  return (
    <Fragment>

      <Router>

      <Route path="/" exact component={Start} />

        {/* RUTAS CLIENTE */}
        <Route
          render={props => (
            !localStorage.getItem('token') ?
              <Route path="/api" component={Nav} /> :
              <Route path="/api" component={NavUser} />
          )}
        />
        <Route
          render={props => (
            localStorage.getItem('token') ?
              <Route path="/api/product" exact component={Product} /> :
              <Route Route exact path="/api" />
          )}
        />
        <Route path="/api" exact component={Index} />
        <Route path="/api/productlist" exact component={ProductList} />
        <Route path="/api/createuser" exact component={CreateUser} />
        <Route path="/api/signin" exact component={Login} />
        <Route path="/api/perfil" exact component={Perfil} />
        <Route path="/api/article/:id" exact component={Article} />


            {/* RUTAS ADMIN */}
        <Route path="/admin" exact component={LoginAdmin} />
        <Route path="/create/admin" exact component={CreateAdmin} />
        <Route path="/admin/user" component={SeccionAdmin} />
        <Route path="/admin/user/list" exact component={UserList} />
        <Route path="/admin/user/perfil" exact component={SeccionAdminPerfil} />
        <Route path="/admin/user/create/product/:id" exact component={Product} />
        <Route path="/admin/user/list/product" exact component={ProductList} />
        <Route path="/admin/user/configuracion" exact component={Configuracion} />
        <Route path="/admin/user/contacto" exact component={SeccionContacto} />
        <Route path="/admin/user/acercade" exact component={SeccionAcercade} />
        <Route path="/admin/user/upload/:id" exact component={UploadImage} />

      </Router>

    </Fragment>


  );

}


export default App;
