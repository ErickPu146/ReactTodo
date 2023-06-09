import './App.css';
import { TodoCounter } from './components/TodoCounter';
import { TodoSearch } from './components/TodoSearch';
import { TodoList } from './containers/TodoList';
import { CreateTodoButton } from './components/CreateTodoButton';
import { TodoItem } from './components/TodoItem';
import React from 'react';


function App() {
  return (
    <div className='container-fluid'>
      <div className='container mt-5 text-center d-flex flex-column justify-content-center gap-4 align-items-center'>
        <TodoList>

        </TodoList>
      </div>
    </div>
  );
}



export { App };
