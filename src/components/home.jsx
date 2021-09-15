import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import Header from "./header";
import Footer from "./footer";
import Loader from "./loader";

class Home extends Component {

    componentDidMount() {
        document.title = "Home | TODO LIST";
    }

    render() {
        return (
            <section className="home">
                <Loader />
                <Header />

                <div className="content">
                    <h2>Hello There!</h2>
                    <p>Make your to do list now,<br/> Make your day better!</p>
                    <NavLink to="/tasks" className="get-started">
                        Get Started
                    </NavLink>
                </div>

                <Footer />
            </section>
        );
    }
}

export default Home;
