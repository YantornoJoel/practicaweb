// BUSCAR FORMA DE PODER SUBIR IMAGENES 









import React, { Component, Fragment } from 'react'
import axios from 'axios'

export default class UploadImage extends Component {
    state = {
        file0: "", 
        _id: ""
    }





    async componentDidMount() {
        // if (this.props.match.params.id) {
          const res = await axios.get(
            "http://localhost:3900/api/article/" + this.props.match.params.id
          );
          console.log(res.data.article);
          this.setState({
            
            _id: this.props.match.params.id,
    
          
          });
        // }
      }





    onSubmit = (e) => {
        e.preventDefault();
        const file0 = this.state.file0
         
    
    
    
        const res = axios.post("http://localhost:3900/api/upload-image/5f5a90a6f597c70a8ca05cd1" , file0)
        console.log("clg de submit:", res)

        this.props.history.push("/admin/user/list/product")
    }


    onInputChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value,
        })

    }





    render() {
        return (
            <Fragment>
                <div className="content text-center">
                    

                        <form className="bg-white  " onSubmit={this.onSubmit}>
                            <input className="upload-image" type="file" name="file0" onChange={this.onInputChange}/>
                            {/* <input className="upload-image" type="text" name="title" placeholder="Título" value={this.state.title} /> */}
                            {/* <textarea className="upload-image" name="description" placeholder="Descripción"></textarea> */}
                            <button className="btn btn-success upload-image" type="submit">Subir</button>
                        </form>


                </div>
            </Fragment>
        )
    }
}
