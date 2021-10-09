import Preloader from "./components/Preloader";
import Checkbox from "@mui/material/Checkbox"
import { useEffect, useState } from 'react';
import { readTodos } from "./functions/index.functions";
import { createTodos, deleteTodo, updateTodo } from "./api/index.api";

class App {

}
function App() {
  // for input field
  const [textField, setTextField] = useState({content: '', checked: false});

  // todos
  const [todos, setTodos] = useState([]);

  // id of selected todo
  const [currentID, setCurrentID] = useState(0);

  // detects change of current ID, sets text field accordingly
  // id 0 -> empty textfield
  // id x -> set textfield to that todo item
  useEffect(() => {
    let currentTextField = currentID !== 0 ? todos.find(todo=>todo._id===currentID) : {content: '', checked: false}
    setTextField(currentTextField);
  }, [currentID])

  // get a display data, async
  const fetchData = async() => {
    const result = await readTodos();
    setTodos(result);
  } 

  // empty dependancy array [], runs once to load the initial data from
  // previous session
  useEffect(() => {
    fetchData(); 
  }, []);

  const clear = () => {
    setCurrentID(0);
    setTextField({content: '', checked: false});
  }

  // What happens when user clicks submit button
  const onSubmitHandler = async (e) => {
    if (textField.content) {
        e.preventDefault();
        if (currentID === 0) { // New todo
          await createTodos(textField); // Add to database
          setTodos([...todos, textField]);
        }
        else { // Update todo instead
          await updateTodo(currentID, textField);
        }
        fetchData();
        clear(); // Clear text field
    }
  }
  const removeTodo = async (id) => {
    const todosCopy = [...todos];
    todosCopy.filter(todo=>todo._id !== id);
    setTodos(todosCopy);
    await deleteTodo(id);
    fetchData();
    clear();
  }

  const handleBoxChange = async (todo) => {
    await updateTodo(todo._id, {content: todo.content, checked: !todo.checked});
    fetchData();
  }
  return (
    <div className="container">
      <div className="row">
        {/* <pre>{JSON.stringify(textField)}</pre>   */}
        {/* <pre>currentID: {currentID}</pre> */}
        {/* text field */}
        <form className="col s12" onSubmit={onSubmitHandler}>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">description</i>
              <input id="description" type="tel" className="validate" value = {textField.content} onChange={e=>setTextField({...textField, content:e.target.value})}/>
              <label htmlFor="description">Task</label>
            </div>
          </div>
          <div className='row right-align'>
            <button className = 'waves-effect waves-light btn'>
            Submit</button>
          </div>
        </form>
        {/* text field */}
        {
          !todos ? <Preloader/> : todos.length > 0 ? 
          <ul className="collection"> 
            {todos.map(todo => (
              <li key={todo._id} className="collection-item">
                <div>
                    <h5>
                    <div onClick={() => handleBoxChange(todo)}><Checkbox checked={todo.checked}/></div>
                    {todo.content}
                    <a href="#!" onClick={() => removeTodo(todo._id)}className="secondary-content"><i className="material-icons">delete</i></a>
                    <a href="#!" onClick={() => setCurrentID(todo._id)}className="secondary-content"><i className="material-icons">edit</i></a>
                    </h5>
                </div>
              </li>
            ))}
          </ul> 
          :
          <Preloader/>
        }
      </div>
    </div>
  );
}

export default App;
