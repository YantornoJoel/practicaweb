import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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

function App() {
  return (
    <Fragment>

      <Router>

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

        <Route path="/api/" exact component={Index} />
        <Route path="/api/product/:id" exact component={Product} />
        <Route path="/api/productlist" exact component={ProductList} />
        <Route path="/api/createuser" exact component={CreateUser} />
        <Route path="/api/signin" exact component={Login} />
        <Route path="/api/perfil" exact component={Perfil} />
        <Route path="/admin" exact component={LoginAdmin} />
        <Route path="/create/admin" exact component={CreateAdmin} />


        <Route path="/admin/user" component={SeccionAdmin} />

       
          <Route path="/admin/user/list" exact component={UserList} />
          <Route path="/admin/user/perfil" exact component={SeccionAdminPerfil} />
       
      </Router>

    </Fragment>


  );

}


export default App;