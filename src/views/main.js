import React, { Component } from "react";
import axios from "axios";
import Gallery from "../components/gallery";
import {Input, Button, Spin} from "antd";
import { LoadingOutlined } from '@ant-design/icons';

const {Search} = Input;

class Main extends Component {
    constructor(props){
        super(props)
        this.state = {
            keyword: "",
            colors: "",
            orientation: "",
            type: "",
            choice: false,
            err: false,
            success: false,
            processing: false,
            images: [],
            hold: "",
            saved: []
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSelection = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
            processing: true
        })
        axios.post("https://imagenara.herokuapp.com/type", this.state)
        .then((response) => {
            console.log(response)
            const result = response.data.err
            this.setState({
                processing: false
            })
            if(result !== undefined){
                this.setState({
                    err: true,
                    success: false,
                    images: []
                })
                console.log("Err!")
            } else {
                let tempArray = []
                for(var i = 0; i < response.data.length; i++){
                    tempArray.push(response.data[i].urls.thumb)
                    console.log(response.data[i].urls.thumb)
                }
                this.setState({
                    images: tempArray
                })
                this.setState({
                    success: true,
                    err: false
                })
                console.log("Success!")
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    handleChoice = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
            processing: true
        })
        axios.post("https://imagenara.herokuapp.com/choice", this.state)
        .then((response) => {
            console.log(response)
            const result = response.data.err
            this.setState({
                processing: false
            })
            if(result !== undefined){
                this.setState({
                    err: true,
                    success: false,
                    images: []
                })
                console.log("Err!")
            } else {
                let tempArray = []
                for(var i = 0; i < response.data.length; i++){
                    tempArray.push(response.data[i].urls.thumb)
                    console.log(response.data[i].urls.thumb)
                }
                this.setState({
                    images: tempArray
                })
                this.setState({
                    success: true,
                    err: false
                })
                console.log("Success!")
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({
            processing: true
        })
        axios.post("https://imagenara.herokuapp.com/search", this.state)
        .then((response) => {
            console.log(response)
            const result = response.data.err
            this.setState({
                processing: false
            })
            if(result !== undefined){
                this.setState({
                    err: true,
                    success: false,
                    images: []
                })
                console.log("Err!")
            } else {
                let tempArray = []
                for(var i = 0; i < response.data.length; i++){
                    tempArray.push(response.data[i].urls.thumb)
                    console.log(response.data[i].urls.thumb)
                }
                this.setState({
                    images: tempArray
                })
                this.setState({
                    success: true,
                    err: false
                })
                console.log("Success!")
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    save = (e) => {
        console.log(e)
        this.state.saved.push(e)
        console.log(this.state.saved)
        localStorage.setItem("saved", JSON.stringify(this.state.saved))
        console.log(JSON.parse(localStorage.getItem("saved")))
    }
    render(){
        return (
            <div className="main">
                <section className="container p-5 text-left">
                    <p>Type a keyword and customize your image search. Editor's choice and image type can be altered after the search. Click on any image to save it in "Saved" tab.</p>
                    <form onSubmit={this.handleSubmit} >   
                        <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default">Search</span>
                        </div>
                        <input id="keyword" onChange={this.handleChange} type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                        </div>
                        <div className="input-group mb-3">
                        <select onChange={this.handleChange} className="custom-select" id="color">
                            <option selected>Choose Color</option>
                            <option value="black">Black</option>
                            <option value="white">White</option>
                            <option value="blue">Blue</option>
                            <option value="orange">Orange</option>
                            <option value="green">Green</option>
                        </select>
                        <div className="input-group-append">
                            <label className="input-group-text" for="color">Color</label>
                        </div>
                        <div class="input-group-text-2 ml-3">
                        <input onChange={this.handleChange} type="checkbox" id="orientation" value="portrait" />
                        <label className="ml-2" for="orientation">Portrait</label>
                        <input onChange={this.handleChange} className="ml-2" type="checkbox" id="orientation" value="landscape" />
                        <label className="ml-2" for="orientation">Landscape</label>
                        </div>
                        </div>
                        <button className="btn btn-dark" type="submit">Get Images</button>
                    </form>

                    <hr />

                    <form className="mt-5">
                    <div className="input-group mb-3">
                        <select onChange={this.handleSelection} className="custom-select" id="type">
                            <option selected>Type Of Image</option>
                            <option value="illustration">Illustration</option>
                            <option value="vector">Vector</option>
                            <option value="photo">Photo</option>
                        </select>
                        <div className="input-group-append">
                            <label className="input-group-text" for="color">Select Type</label>
                        </div>
                        </div>
                        <div class="input-group-text-2 ml-3">
                        <input onChange={this.handleChoice} type="checkbox" id="choice" value="true" />
                        <label className="ml-2" for="choice">Editor's Choice</label>
                        </div>
                    </form>
                    {this.state.processing ? <div className="text-center"><LoadingOutlined /></div> : <div></div>}

                    <section className="container pt-5">
                {this.state.err ? 
                <div className="alert alert-danger" role="alert">
                Oops! The search term dosen't match with any photo.
                </div>
                : 
                <div></div>
                }
                </section>

                {this.state.success 
                ?
                <section className="container">
                    
                </section>
                :
                <section className="gallery container">
                    <Gallery />
                </section>
                }

                    {this.state.processing ? <div className="p-4"><LoadingOutlined /></div>
                     : 
                     <div className="row pt-5">
                         {this.state.images.map((item, index) => {
                             return (
                                 <div className="column">
                                     <a onClick={()=>this.save(item)}><img src={item} alt="" /></a>
                                </div>
                             )
                         })}
                    </div>}
                </section>
            </div>
        )
    }
};

export default Main;