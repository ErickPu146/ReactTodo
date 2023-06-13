function TodoCounter({ total, completed }) {
    return (
        <div className="fs-1">
          Haz completado <span className="fw-bold"> {completed} </span> de 
          <span className="fw-bold"> {total} </span> TODOs
        </div>
      )
}

export { TodoCounter }
  