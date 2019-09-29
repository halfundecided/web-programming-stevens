import React, { Component } from "react";

class Product extends Component {
  buttonClick = () => {
    alert(this.props.product.productName + " was clicked");
    this.props.handleClick(this.props.product.productName);
  };
  render() {
    return (
      <div>
        <h1>{this.props.product.productName}</h1>
        <p>{this.props.product.productDesc}</p>
        <img src={process.env.PUBLIC_URL + this.props.product.imgName} />
        <p>$ {this.props.product.productPrice}</p>
        <br />
        <button onClick={this.buttonClick}>
          Buy the {this.props.product.productName}
        </button>
        <br />
        <br />
      </div>
    );
  }
}

export default Product;
