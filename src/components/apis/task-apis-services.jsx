import axios from "axios";

const TASKS_API_REST_URL = "https://henry-todo-list.herokuapp.com/api/tasks";

class TaskAPIsServices {
    getTasks() {
        return axios.get(TASKS_API_REST_URL);
    }

    getTaskById(taskId) {
        return axios.get(TASKS_API_REST_URL + "/" + taskId);
    }

    getCompletedTasks() {
        return axios.get(TASKS_API_REST_URL + "/completed");
    }

    createTask(task) {
        axios.post(TASKS_API_REST_URL, task);
    }

    updateTask(task, taskId) {
        axios.put(TASKS_API_REST_URL + "/" + taskId, task);
    }

    deleteTask(taskId) {
        axios.delete(TASKS_API_REST_URL + "/" + taskId);
    }
}

export default new TaskAPIsServices();
