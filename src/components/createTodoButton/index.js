import './style.css'
import Button from 'react-bootstrap/Button';
import { useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Plus } from 'react-bootstrap-icons';
import { TodoContext } from '../../TodoContext';

function CreateTodoButton() {
    const {
        addTodo,
        textNewTodo,
        setTextNewTodo,
    } = useContext(TodoContext);
    
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
                        onChange={(event) => setTextNewTodo(event.target.value)}
                    />
                </Modal.Body>

                <Modal.Footer>
                    <Button 
                        variant="secondary"
                        onClick={()=> {
                            handleClose();
                            setTextNewTodo("");
                        }}
                    >
                        Cerrar
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={() => {
                        if(textNewTodo.trim() !== '') {
                            setTextNewTodo("");
                            addTodo(textNewTodo);
                        };
                        handleClose();
                    }}>
                        Crear
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
        )
}

export { CreateTodoButton }
  