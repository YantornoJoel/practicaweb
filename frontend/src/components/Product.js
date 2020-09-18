import React, { Component } from "react";
import axios from "axios"; //Libreria para realizar peticiones HTTP
// import { Link } from "react-router-dom";
import DatePicker from "react-datepicker"; //Formato que muestra la fecha
import "react-datepicker/dist/react-datepicker.css";




export default class article extends Component {
  state = {
    title: "",
    content: "",
    _id: "",
    marca: "",
    precio: "",
    editing: false,
    date: new Date(),
    
    
  };

  //Componente que carga antes de que se muestre la pagina del frontend
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
    }
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const newArticle = {
      title: this.state.title,
      content: this.state.content,
      date: this.state.date,
      marca: this.state.marca,
      precio: this.state.precio      
    };

    if (!this.state.editing) {
      await axios.post("http://localhost:3900/api/save", newArticle);
    } else {
      await axios.put(
        "http://localhost:3900/api/article/" + this.state._id,
        newArticle
      );
    }
    
    console.log(this.state)

    this.props.history.push("/admin/user/upload/:id");
  };

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
   
  };

  onChangeDate = (date) => {
    this.setState({ date });
  };




  render() {
    return (
      <div className="content">
      
        <div  className="card col-md-9 mx-auto product-add">
         
            <h1 className="mt-4 text-center card-header mb-4">Subir Producto</h1>
            <form className="form-group d-inline-block " onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Título</label>
                <input
                  type="text"
                  className="form-control "
                  placeholder="Título"
                  name="title"
                  onChange={this.onInputChange}
                  value={this.state.title}
                  required
                />
              </div>
              {<br />}
              <div className="form-group ">
                <label>Contenido</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Contenido"
                  name="content"
                  onChange={this.onInputChange}
                  value={this.state.content}
                  required
                />
              </div>
              {<br />}
              <div className="form-group ">
                <label>Marca</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Marca"
                  name="marca"
                  onChange={this.onInputChange}
                  value={this.state.marca}
                  required
                />
              </div>
              {<br />}
              <div className="form-group ">
                <label>Precio</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Precio"
                  name="precio"
                  onChange={this.onInputChange}
                  value={this.state.precio}
                  required
                />
              </div>
              {<br />}
              <div className=" ">
                <label className="d-block">Fecha</label>
                <DatePicker
                  className="form-control d-inline-block"
                  selected={this.state.date}
                  
                  onChange={this.onChangeDate}
                />
              </div>
              
              {<br />} {<br />}
              <div className="form-">
              <button 
                  type="submit" 
                  className="btn btn-dark form-control"

                  // onClick={this.fileUpload}
                  >
                Añadir
              </button>
              </div>
            </form>
      
        </div>
     
      
      </div>
    );
  }
}
