import React, {Component} from "react";

const HomeStyle = {
  padding: "80px 0",
  textAlign: "center",
  fontFamily: "Open Sans, sans-serif",
  fontWeight: "600",
  color: "#999"
};

const lander = {
  padding: "80px 0",
  textAlign: "center"
};

const h1Lander = {
  fontFamily: "Open Sans, sans-serif",
  fontWeight: "600"
};

const pLander = {
  color: "#999"
};

 export default class Home extends Component {
   render() {
     return (
        <div style = {HomeStyle} className = "Home">
          <div style = {lander} className = "lander">
            <h1 style = {h1Lander} >Budget App</h1>
            <p style = {pLander}>Great App for maitaining your budget</p>
          </div>
        </div>
     );
   }
 }
