import React, {Component} from "react";
import { LoadingOutlined } from '@ant-design/icons';

class Saved extends Component {
    constructor(props){
        super(props)
        this.state = {
            images: [],
            fetched: false
        }
    }

    componentDidMount = () => {
        var tempImages = []
        var tempArray = []
        var tempImages = JSON.parse(localStorage.getItem("saved"))
        console.log(tempImages)
        if(tempImages.length === null)
        {
            this.setState({
                fetched: false
            })
        } else {
            tempArray = []
            for(var i = 0; i < tempImages.length; i++){
                tempArray.push(tempImages[i])
                console.log(tempImages[i])
                this.setState({
                    fetched: true
                })
            }
        }
        this.setState({
            images: tempArray,
        })
    }

    clear = () => {
        localStorage.removeItem("saved")
        window.location.replace("/")
    }

    render(){
        return (
            <div className="container text-center pt-4">
                <h1>Here are your saved images.</h1>
                <h2>Click on them to download!</h2>
                <button className="btn mb-4 btn-primary" onClick={this.clear}>Clear Saved</button>
                {this.state.fetched ? 
                <div className="row">
                    <img src={this.state.images}/>
                    {this.state.images.map((item, index) => {
                        return (
                            <div className="column">
                                <a href={item} onClick={()=>this.save(item)} download="imagenara"><img src={item} alt="" /></a>
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

export default Saved;