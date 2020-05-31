import React, { Component } from "react";
import axios from "axios";
import {LoadingOutlined} from '@ant-design/icons';

class Category extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            param: this.props.match.params.category,
            images: [],
            fetched: false,
            saved: []
        }
    }

    componentDidMount = () => {
        axios.get(`https://imagenara.herokuapp.com/${this.state.param}`)
        .then((response) => {
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
            <div className="text-center container">
                <h1 className="pt-4">Trending in {this.state.param}, today.</h1>
                {this.state.fetched ? 
                <div className="row pt-5">
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

export default Category;