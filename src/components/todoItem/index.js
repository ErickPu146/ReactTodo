import React from 'react';
import { CheckCircleFill } from 'react-bootstrap-icons';
import { TrashFill } from 'react-bootstrap-icons';
import { PencilSquare } from 'react-bootstrap-icons';
import './style.css';
import { Form } from 'react-bootstrap';

function TodoItem({ item, completeTodo, deleteTodo, index, editTodo, EnabledIsEdit }) {

  return (
    <li 
      key={index + 100}
      className={`${item.completed ? 'completed' : 'bg-light'}
      rounded-5 py-4 px-md-4 d-flex justify-content-between align-items-center`}

    >
      <div className='w-25 d-flex -justify-content-start'>
        <CheckCircleFill 
          onClick={() => completeTodo(item.id)} 
          className="completeHover" 
        />
      </div>

      <div className='w-50 d-flex-justify-content-center'>
      <div
        className={item.toEdit ? 'd-none' : 'd-block'}
      >
        {(item.text)}
      </div>
        <Form.Control 
          className={item.toEdit ? 'd-block' : 'd-none'}
          value={item.text} 
          as="textarea" 
          rows="3" 
          name="description" 
          onChange={(event) => editTodo(event, item.id)}
        />
      </div>

      <div className={`${item.toEdit  ? 'justify-content-between' : 'justify-content-end'} d-flex gap-1 gap-md-3 w-25`}>
        <PencilSquare 
          className={`${item.toEdit  ? 'editPencil shadow' : ''} fs-5 editHover`} 
          onClick={() => { 
            EnabledIsEdit(item.id)
          }}
        />
        <TrashFill 
          onClick={() => deleteTodo(item.id)}
          className="fs-5 deleteHover" 
        />
      </div>
    </li>
  );
}

export { TodoItem };