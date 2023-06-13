import React, { useState } from 'react';
import { CheckCircleFill } from 'react-bootstrap-icons';
import { TrashFill } from 'react-bootstrap-icons';
import { PencilSquare } from 'react-bootstrap-icons';
import './TodoItem.css';
import { Form } from 'react-bootstrap';

function TodoItem({ item, text, completed, onComplete, onDelete, identificador, index, ActualizarTarea, isEdit, EnabledIsEdit }) {

  return (
    <li 
      key={index + 100}
      className={`${completed ? 'completed' : 'bg-light'} shadow rounded-5 p-4 d-flex justify-content-between align-items-center w-100`}
    >
      <div className='w-25 d-flex -justify-content-start'>
        <CheckCircleFill 
          onClick={() => onComplete(index)} 
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
          className={(identificador === item.identificador) & isEdit ? 'd-block w-100' : 'd-none'}
          value={item.text} 
          as="textarea" 
          rows="3" 
          name="description" 
          onChange={(event) => ActualizarTarea(event, index)}
        />
      </div>

      <div className={`${isEdit ? 'justify-content-between' : 'justify-content-end'} d-flex gap-2 w-25`}>
        <PencilSquare 
          className={`${isEdit ? 'editPencil shadow' : ''} fs-5 editHover`} 
          onClick={() => EnabledIsEdit(item.identificador)}
        />
        <TrashFill 
          onClick={() => onDelete(index)}
          className="fs-5 deleteHover" 
        />
      </div>
    </li>
  );
}

export { TodoItem };