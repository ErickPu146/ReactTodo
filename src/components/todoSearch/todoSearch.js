function TodoSearch({searchValue, setSearchValue, filterSelect}) {

    return (
        <div className='w-100 row justify-content-center gap-1 gap-md-0'>
            <div className="col-12 col-md-9">
                <input className="form-control w-100" placeholder="Filtrar tareas"
                value={searchValue}
                onChange={(event) => {
                    setSearchValue(event.target.value)
                }}/>
            </div>

            <div className="col-6 col-md-3">
                <select className='form-select w-100' onChange={(event) => filterSelect(event.target.value)}>
                    <option value="all">Todas</option>
                    <option value="pending">Pendientes</option>
                    <option value="completed">Completadas</option>
                </select>
            </div>
        </div>
    )
}

export { TodoSearch }
  