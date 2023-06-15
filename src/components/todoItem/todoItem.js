import React, { useState } from 'react';
import { CheckCircleFill } from 'react-bootstrap-icons';
import { TrashFill } from 'react-bootstrap-icons';
import { PencilSquare } from 'react-bootstrap-icons';
import './TodoItem.css';
import { Form } from 'react-bootstrap';

function TodoItem({ item, text, completed, completeTodo, deleteTodo, identificador, index, ActualizarTarea, isEdit, EnabledIsEdit }) {

  return (
    <li 
      key={index + 100}
      className={`${completed ? 'completed' : 'bg-light'} ${item.toEdit ? 'shadow-info' : 'shadow'}
      rounded-5 py-4 px-md-4 d-flex justify-content-between align-items-center`}

    >
      <div className='w-25 d-flex -justify-content-start'>
        <CheckCircleFill 
          onClick={() => completeTodo(index)} 
          className="completeHover" 
        />
      </div>

      <div className='w-50 d-flex-justify-content-center'>
      <div
        className={!(identificador === item.identificador) ? 'd-block' : 'd-none'}
      >
        {(item.text)}
      </div>
        <Form.Control 
          className={(identificador === item.identificador) & isEdit ? 'd-block' : 'd-none'}
          value={item.text} 
          as="textarea" 
          rows="3" 
          name="description" 
          onChange={(event) => ActualizarTarea(event, index)}
        />
      </div>

      <div className={`${isEdit ? 'justify-content-between' : 'justify-content-end'} d-flex gap-1 gap-md-3 w-25`}>
        <PencilSquare 
          className={`${isEdit ? 'editPencil shadow' : ''} fs-5 editHover`} 
          onClick={() => { 
            EnabledIsEdit(item.identificador)
          }}
        />
        <TrashFill 
          onClick={() => deleteTodo(index)}
          className="fs-5 deleteHover" 
        />
      </div>
    </li>
  );
}

export { TodoItem };