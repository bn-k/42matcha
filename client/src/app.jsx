import React from "react";
import ReactDOM from "react-dom";
import Router from "./react/root";
import './public/css/style.css'
require('./public/css/main.scss');

ReactDOM.render(<Router />, document.getElementById('app'));
