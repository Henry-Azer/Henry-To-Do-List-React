import React, { Component } from "react";

import Header from "../header";
import Footer from "../footer";
import Loader from "../loader";
import AddTask from "./add-task";
import TaskList from "./task-list";
import CompletedTaskList from "./completed-task-list";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import TaskImg from "../../resources/images/tasks.jpg";

import axios from "axios";
import TaskAPIsServices from "../apis/task-apis-services";
const TASKS_API_REST_URL = "https://henry-todo-list.herokuapp.com/api/tasks";

class Tasks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            completedTasks: [],
        };
    }

    componentDidMount() {
        document.title = "Tasks | TODO LIST";

        this.handleTaskFetch();
    }

    handleTaskFetch = () => {
        TaskAPIsServices.getCompletedTasks()
            .then((response) => {
                this.setState({ completedTasks: response.data });
            })
            .catch(function (ex) {
                console.log("Response parsing failed. Error: ", ex);
            });

        TaskAPIsServices.getTasks()
            .then((response) => {
                this.setState({ tasks: response.data });
            })
            .catch(function (ex) {
                console.log("Response parsing failed. Error: ", ex);
            });
    };

    handleTaskCreate = (values) => {
        axios.post(TASKS_API_REST_URL, values).then(() => {
            return TaskAPIsServices.getTasks().then((response) => {
                this.setState({ tasks: response.data });
            });
        });
    };

    handleTaskUpdate = (task) => {
        task.complete = !task.complete;
        axios
            .put(TASKS_API_REST_URL + "/" + task.id, task)
            .then(() => {
                return TaskAPIsServices.getCompletedTasks().then((response) => {
                    this.setState({ completedTasks: response.data });
                });
            })
            .then(() => {
                return TaskAPIsServices.getTasks().then((response) => {
                    this.setState({ tasks: response.data });
                });
            });
    };

    handleTaskDelete = (task) => {
        confirmAlert({
            title: "Delete '" + task.name + "' !",
            message: "Are you sure to do this?",
            buttons: [
                {
                    label: "Yes",
                    onClick: () =>
                        axios
                            .delete(TASKS_API_REST_URL + "/" + task.id)
                            .then(() => {
                                return TaskAPIsServices.getCompletedTasks().then(
                                    (response) => {
                                        this.setState({
                                            completedTasks: response.data,
                                        });
                                    }
                                );
                            })
                            .then(() => {
                                return TaskAPIsServices.getTasks().then(
                                    (response) => {
                                        this.setState({ tasks: response.data });
                                    }
                                );
                            }),
                },
                {
                    label: "No",
                },
            ],
        });
    };

    render() {
        function getDate() {
            var today = new Date();
            return (
                today.getFullYear() +
                "-" +
                (today.getMonth() + 1) +
                "-" +
                today.getDate()
            );
        }

        return (
            <section className="tasks">
                <Loader />
                <Header />

                <div className="tasks-container">
                    <img src={TaskImg} alt="Task" />
                    <h2>TASKS</h2>
                    <h5>{getDate()}</h5>

                    <h3>
                        <em>Add</em> Task
                    </h3>
                    <AddTask
                        handleTaskCreate={this.handleTaskCreate}
                    />

                    <h3>
                        <em>Todo</em> Tasks
                    </h3>
                    <TaskList
                        tasks={this.state.tasks}
                        handleTaskUpdate={this.handleTaskUpdate}
                        handleTaskDelete={this.handleTaskDelete}
                    />

                    <h3>
                        <em>Completed</em> Tasks
                    </h3>
                    <CompletedTaskList
                        tasks={this.state.completedTasks}
                        handleTaskUpdate={this.handleTaskUpdate}
                        handleTaskDelete={this.handleTaskDelete}
                    />
                </div>

                <Footer />
            </section>
        );
    }
}

export default Tasks;
