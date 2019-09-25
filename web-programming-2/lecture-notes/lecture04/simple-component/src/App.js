import React, { Component } from "react";
import "./App.css";
import Product from "./components/Product";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productsClicked: []
    };
  }

  handleChildClick = item => {
    this.setState(prevState => ({
      productsClicked: [...prevState.productsClicked, item]
    }));
  };

  render() {
    return (
      <div className="App">
        {this.state.productsClicked.map(item => {(
          <div>
            {item}
            <br />
          </div>
        ))}
        <Product
          product={{
            productName: "Pixel 4",
            productDesc:
              "This is the new phone from Google, You know you want it",
            productPrice: 999,
            imgName: "pixel.jpg"
          }}
          handleChildClick={this.handleChildClick}
        />
        <br />
        <Product
          product={{
            productName: "iPhone 11",
            productDesc:
              "This is the new phone from Apple, You know you want it, because you're an iSheep.",
            productPrice: 1999,
            imgName: "iphone.png"
          }}
          handleChildClick={this.handleChildClick}
        />
      </div>
    );
  }
}

export default App;
