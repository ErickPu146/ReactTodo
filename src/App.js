import { TodoList } from './containers/TodoList';
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
