import React from 'react';
import styles from './Item.module.css';
import { ACTIONS } from '../App/App';

const ToDoItem = ({ id, text, completed, dispatch }) => {
  const handleDelete = () => {
    dispatch({ type: ACTIONS.DELETE_TODO, payload: { id } });
  };

  const handleToggle = () => {
    dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { id } });
  }

  const ifCompleted = completed ? styles.yesCompleted : styles.noCompleted;

  return (
    <li className={styles.toDo}>
      📌 <span className={ifCompleted}>{text}</span>
      <button className={styles.button} onClick={handleToggle}>Toggle</button>
      <button className={styles.button} onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default ToDoItem;