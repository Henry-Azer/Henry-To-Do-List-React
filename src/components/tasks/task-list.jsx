import React, { Component } from "react";

import Moment from "moment";
import DeleteIcon from "@material-ui/icons/Delete";
import DingAudioEffect from "../../resources/sound/ding.mp3";

class TaskList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
        };
    }

    UNSAFE_componentWillReceiveProps(props) {
        this.setState({ tasks: props.tasks });
    }

    playAudio = () => {
        new Audio(DingAudioEffect).play();
    };

    onUpdateClick = (task) => {
        this.props.handleTaskUpdate(task);
        this.playAudio();
    };

    render() {
        function getDate(date) {
            var today = new Date();
            return (
                today.getFullYear() +
                "-" +
                ("0" + (today.getMonth() + 1)).slice(-2) +
                "-" +
                ("0" + today.getDate()).slice(-2)
            );
        }

        function dueDateDisplay(dueDate) {
            return Moment(dueDate).format("YYYY-MM-DD");
        }

        return (
            <div className="task-list-container">
                <ul className="task-list">
                    {this.state.tasks.map((task) => {
                        return (
                            <li className="task-list-item" key={task.id}>
                                <label
                                    className="task-list-item-label"
                                    onClick={() => {
                                        this.onUpdateClick(task);
                                    }}
                                >
                                    <input type="checkbox" />
                                    <span>{task.name}</span>
                                </label>
                                <span className="due-date">
                                    {dueDateDisplay(task.dueDate)}
                                </span>
                                {dueDateDisplay(task.dueDate) < getDate() ? (
                                    <div className="out-of-date">
                                        out of date!{" "}
                                    </div>
                                ) : (
                                    ""
                                )}
                                <DeleteIcon
                                    className="delete-btn"
                                    onClick={() =>
                                        this.props.handleTaskDelete(task)
                                    }
                                />
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default TaskList;
