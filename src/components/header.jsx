import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Header extends Component {
    constructor(params) {
        super(params);

        this.state = {
            darkActive: JSON.parse(localStorage.getItem("Mode")),
        };
    }

    toggleDarkMode = () => {
        if (JSON.parse(localStorage.getItem("Mode")) === true) {
            this.setState({ darkActive: false }, () => {
                localStorage.setItem("Mode", JSON.stringify(false));
            });
            document.getElementById("root").classList.remove("dark-mode");
        } else {
            this.setState({ darkActive: true }, () => {
                localStorage.setItem("Mode", JSON.stringify(true));
            });
            document.getElementById("root").classList.add("dark-mode");
        }
    };

    componentDidMount() {
        this.state.darkActive
            ? document.getElementById("root").classList.add("dark-mode")
            : document.getElementById("root").classList.remove("dark-mode");
    }

    render() {
        return (
            <nav className="nav-container">
                <div className="logo-container">
                    <NavLink to="/" className="logo">
                        ToDo <em>list</em>
                    </NavLink>
                </div>

                <input
                    type="checkbox"
                    id="toggle-mode-cb"
                    defaultChecked={JSON.parse(localStorage.getItem("Mode"))}
                    onClick={() => {
                        this.toggleDarkMode();
                    }}
                />
                <div id="toggle-wrapper">
                    <label id="toggle-mode" htmlFor="toggle-mode-cb">
                        <span className="toggle-border">
                            <span className="toggle-indicator"></span>
                        </span>
                    </label>
                </div>
            </nav>
        );
    }
}

export default Header;
