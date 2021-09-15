import React, { Component } from "react";

class AddTask extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            repeated: "",
            dueDate: "",
            complete: "false",
            startDate: new Date(),
        };
    }

    handleChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const task = {
            ...this.state,
        };
        setTimeout(() => {
            this.props.handleTaskCreate(task);
        }, 400);

        this.setState({
            name: "",
            repeated: "",
            dueDate: "",
            complete: "false",
            startDate: new Date(),
        });
    };

    render() {
        return (
            <div className="add-task-container">
                <form className="add-task" onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        required
                        maxLength="14"
                        name="name"
                        autoComplete="off"
                        className="question"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                    <label>
                        <span>Add new task!</span>
                    </label>

                    <label className="dueDate-label">
                        <span>Due Date: </span>
                        <input
                            type="date"
                            name="dueDate"
                            required
                            value={this.state.dueDate}
                            onChange={this.handleChange}
                        />
                    </label>

                    <label className="repeat-label">
                        <span>Repeat: </span>
                        <select
                            name="repeated"
                            required
                            value={this.state.repeated}
                            onChange={this.handleChange}
                        >
                            <option value="None">None</option>
                            <option value="Daily">Daily</option>
                            <option value="Weekly">Weekly</option>
                            <option value="Monthly">Monthly</option>
                        </select>
                    </label>

                    <input
                        className="submit-task"
                        type="submit"
                        value="Submit"
                    />
                </form>
            </div>
        );
    }
}

export default AddTask;
