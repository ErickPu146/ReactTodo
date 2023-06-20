function TodoCounter({ total, completed }) {
    return (
        <div className="fs-1">
          <span className={`${total === 0 | total === completed ? 'd-none' : 'd-block'}`}>
            Haz completado <span className="fw-bold"> {completed} </span> de 
            <span className="fw-bold"> {total} </span> tarea's
          </span>
          <span className={`${total > 0 & total === completed ? 'd-block' : 'd-none'} fw-bold`}>
            Felcidades, haz completado todas tus tareas :)
          </span>
          <span className={`${total === 0 ? 'd-block' : 'd-none'} fw-bold`}>
            Agrega Tareas
          </span>
        </div>
      )
}

export { TodoCounter }
  