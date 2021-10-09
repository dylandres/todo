import axios from 'axios';
const url = 'http://localhost:5000/todos';
// frontend functions which use backend routing
export const readTodos = () => axios.get(url);
export const createTodos = newTodo => axios.post(url, newTodo);  
export const updateTodo = (id, updatedTodo) => axios.patch(`${url}/${id}`, updatedTodo);
export const deleteTodo = (id) => axios.delete(`${url}/${id}`);