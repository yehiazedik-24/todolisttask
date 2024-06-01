import React, { useState, useRef } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Swal from 'sweetalert2/dist/sweetalert2.min.js';
import 'sweetalert2/dist/sweetalert2.min.css';



function App() {
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const inputRef = useRef();

  const addTodo = () => {
    const text = inputRef.current.value;
    if (text) {
      const newItem = { completed: false, text };
      setTodos([...todos, newItem]);
      inputRef.current.value = '';
    } else {
      Swal.fire('Please enter a task');
    }
  };

  const editTodo = (index) => {
    setIsEditing(true);
    setCurrentTodo(index);
    inputRef.current.value = todos[index].text;
  };

  const updateTodo = () => {
    const text = inputRef.current.value;
    const updatedTodos = [...todos];
    updatedTodos[currentTodo].text = text;
    setTodos(updatedTodos);
    setIsEditing(false);
    setCurrentTodo(null);
    inputRef.current.value = '';
  };

  const toggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <>
      <div className="App">
        <h2 className="text-center fw-bold fs-2 addes">To Do List</h2>
        <div className="d-flex flex-column">
          <input ref={inputRef} placeholder="Enter Item..." className="mb-3" />
          <button className="btn btn-primary mb-3" onClick={isEditing ? updateTodo : addTodo}>
            {isEditing ? 'Update' : 'Add'}
          </button>
          <ul className="list-unstyled">
            {todos.map(({ text }, index) => (
              <div className="d-flex justify-content-between align-items-center mb-2" key={index}>
                <li
                  className={`w-50 ${todos[index].completed ? 'text-decoration-line-through' : ''}`}
                  onClick={() => toggleComplete(index)}
                >
                  {text}
                </li>
                <div>
                  <button className="btn btn-warning me-2" onClick={() => editTodo(index)}>
                  Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => deleteTodo(index)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
