import React, { Component } from "react";

import Moment from "moment";
import DeleteIcon from "@material-ui/icons/Delete";
import GoingUpAudioEffect from "../../resources/sound/going-up.mp3";

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
        new Audio(GoingUpAudioEffect).play();
    };

    onUpdateClick = (task) => {
        this.props.handleTaskUpdate(task);
        this.playAudio();
    }

    render() {
        function dueDateDisplay(dueDate) {
            return Moment(dueDate).format("YYYY-MM-DD");
        }

        return (
            <div className="task-list-container">
                <ul className="task-list">
                    {this.state.tasks.map((task) => (
                        <li className="task-list-item" key={task.id}>
                            <label
                                className="task-list-item-label"
                                onClick={() => {
                                    this.onUpdateClick(task);
                                }}
                            >
                                <input type="checkbox" defaultChecked={true} />
                                <span>{task.name}</span>
                            </label>
                            <span className="due-date">
                                {dueDateDisplay(task.dueDate)}
                            </span>
                            <DeleteIcon
                                className="delete-btn"
                                onClick={() => {
                                    this.props.handleTaskDelete(task);
                                }}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default TaskList;
