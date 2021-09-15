import React, { Component } from "react";

class Loader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loaderActive: false,
        };
    }

    componentDidMount() {
        this.setState({
            loaderActive: true,
        });

        setTimeout(() => {
            this.setState({
                loaderActive: false,
            });
        }, 2500);
    }

    render() {
        return (
            <div
                className={`${
                    this.state.loaderActive ? "loader-wapper" : "loader-off"
                }`}
            >
                <div className="square-loader">
                    <div className="inner-loader">
                        <div className="three-dots-loader"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Loader;
