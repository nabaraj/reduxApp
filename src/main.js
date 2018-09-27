import React, { Component } from "react";
import Menu from "./components/menu";
import Footer from "./components/footer";
import { connect } from "react-redux";

class Main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Menu totalQty={this.props.cart.totalQty} />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

//export default Main;
function mapStateToProps(state) {
  return {
    ...state
  };
}

export default connect(mapStateToProps)(Main);
