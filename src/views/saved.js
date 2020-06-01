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

    download = (e) => {
    var element = document.createElement("a");
    var file = new Blob(
      [
        e
      ],
      { type: "image/*" }
    );
    element.href = URL.createObjectURL(file);
    element.download = "imagenara.jpg";
    element.click();
  };

    render(){
        return (
            <div className="container text-left pt-4">
                <p>Click on the image to download or tap "Clear saved" to start a new search.</p>
                <button className="btn mb-4 btn-primary" onClick={this.clear}>Clear Saved</button>
                {this.state.fetched ? 
                <div className="row">
                    <img src={this.state.images}/>
                    {this.state.images.map((item, index) => {
                        return (
                            <div className="column">
                                <a href={item} target="_blank" onClick={() => this.download(item)} download="imagenara"><img src={item} alt="" /></a>
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