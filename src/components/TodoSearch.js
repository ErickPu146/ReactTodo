import React, { useState } from 'react';

function TodoSearch({searchValue, setSearchValue, filterSelect}) {

    return (
        <div className='w-100 d-flex'>
            <input className="form-control w-75" placeholder="Filtrar tareas"
            value={searchValue}
            onChange={(event) => {
                setSearchValue(event.target.value)
            }}/>
            <select className='w-25 form-select' onChange={(event) => filterSelect(event.target.value)}>
                <option value="all">Todas</option>
                <option value="pending">Pendientes</option>
                <option value="completed">Completadas</option>
            </select>
        </div>
    )
}

export { TodoSearch }
  