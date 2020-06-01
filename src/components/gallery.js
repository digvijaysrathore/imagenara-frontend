import React, { Component } from "react";
import axios from "axios";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import "../styles.css";

class Gallery extends Component {
    constructor(props){
        super(props)
        this.state = {
            images: [],
            fetched: false,
            saved: []
        }
    }

    componentDidMount = () => {
        axios.get("https://imagenara.herokuapp.com/pictures")
        .then(response => {
            console.log(response.data)
            let tempArray = []
            for(var i = 0; i < response.data.length; i++){
                tempArray.push(response.data[i].previewURL)
                console.log(response.data[i].previewURL)
            }
            this.setState({
                images: tempArray,
                fetched: true
            })
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
            <div className="text-center">
                {this.state.fetched ? 
                <div className="row">
                    {this.state.images.map((item, index) => {
                        return (
                            <div className="column">
                                <a onClick={()=>this.save(item)}><img src={item} alt="" /></a>
                            </div>
                        )
                    })}
                </div>
                 :
                 <div className="p-5">
                    <LoadingOutlined />
                </div>
                }
            </div>
        )
    }
};

export default Gallery;