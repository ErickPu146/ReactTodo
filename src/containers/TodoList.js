

function TodoList() {
  

    return (
        <>
            <TodoCounter
                total={totalTodos} 
                completed={completedTodos}
            />
            <TodoSearch 
                filterSelect={filterSelect}
                searchValue={searchValue} 
                setSearchValue={setSearchValue}
            />
            <ul className="list-unstyled row gap-3 w-100">
                {searchedTodos.map((todo, index) => (
                    <TodoItem 
                        key={index}
                        index={index}
                        identificador={id} 
                        item={todo}
                        completed={todo.completed}
                        completeTodo={completeTodo}
                        deleteTodo={deleteTodo}
                        isEdit={isEdit}
                        EnabledIsEdit={EnabledIsEdit}
                        ActualizarTarea={ActualizarTarea}
                    />
                ))}
            </ul>
            <CreateTodoButton 
                textNewTodo={textNewTodo}
                addTodo={addTodo}
                setTextNewTodo={setTextNewTodo}
            />
        </>

    )
}

export { TodoList }