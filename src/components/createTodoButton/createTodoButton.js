import './CreateTodoButton.css'
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Plus } from 'react-bootstrap-icons';


function CreateTodoButton({ addTodo, inputTextNewTodo, value, setValue }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button onClick={() => handleShow()} className="CreateTodoButton">
                <Plus/>
            </button>

            <Modal 
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Crear nueva tarea</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input 
                        className="form-control" 
                        placeholder="Descripcion de la tarea"
                        onChange={(event) => inputTextNewTodo(event)}
                    />
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={()=> {
                    handleClose()
                    setValue("")
                }}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={() => {
                    handleClose()
                    if(value.trim() != '') {
                        addTodo(value)
                        setValue("")
                    }
                }}>
                    Crear
                </Button>
                </Modal.Footer>
            </Modal>
        </>
        )
}

export { CreateTodoButton }
  