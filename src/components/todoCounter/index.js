import { useContext } from "react"
import { TodoContext } from "../../TodoContext"

function TodoCounter() {
  const {
    totalTodos,
    completedTodos,
  } = useContext(TodoContext);

  return (
    <div className="fs-1">
      <span className={`${totalTodos === 0 | totalTodos === completedTodos ? 'd-none' : 'd-block'}`}>
        Haz completado <span className="fw-bold"> {completedTodos} </span> de 
        <span className="fw-bold"> {totalTodos} </span> tarea's
      </span>
      <span className={`${totalTodos > 0 & totalTodos === completedTodos ? 'd-block' : 'd-none'} fw-bold`}>
        Felcidades, haz completado todas tus tareas :)
      </span>
      <span className={`${totalTodos === 0 ? 'd-block' : 'd-none'} fw-bold`}>
        Agrega Tareas
      </span>
    </div>
  )
}

export { TodoCounter }
  