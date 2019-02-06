import React from "react";
import {NavLink} from "react-router-dom"
import {Logout} from "./modules/logout"

const Navigation = () => {
    return (
        <div>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/user">User</NavLink>
            <NavLink to="/logout">Logout</NavLink>
        </div>
    )
};

export default Navigation;