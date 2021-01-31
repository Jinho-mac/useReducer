import { useReducer, useRef, useState } from 'react';
import Item from '../Item/Item';
import styles from "./App.module.css";

export const ACTIONS = {
  ADD_TODO: 'ADD_TODO',
  DELETE_TODO: 'DELETE_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO'
};

const makeTodo = payload => {
  return {
    id: payload.id,
    text: payload.text,
    completed: false
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO": 
      return [...state, makeTodo(action.payload)];
    case "DELETE_TODO": 
      return state.filter(item => item.id !== action.payload.id);
    case "TOGGLE_TODO": 
      return state.map(item => {
        if (item.id === action.payload.id) {
          return { ...item, completed: !item.completed };
        } else {
          return item;
        }
      });
    default :
      return new Error("inappropriate action type 🥲")
  }
}

const App = () => {
  const [toDos, dispatch] = useReducer(reducer, []);
  const [text, setText] = useState("");
  const formRef = useRef();

  const onChange = e => {
    const value = e.target.value;
    setText(value);
  } 

  const onSubmit = e => {
    const id = Math.ceil(Math.random()*1000);
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_TODO, payload: { id, text } });
    formRef.current.reset();
  }

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit} ref={formRef}>
        <input type="text" onChange={onChange} className={styles.input}/>
      </form>
      <ul>
        {toDos && toDos.map(toDo => {
          return <Item key={toDo.id} {...toDo} dispatch={dispatch}/>
        })}
      </ul>
    </div>
  )
}

export default App;
