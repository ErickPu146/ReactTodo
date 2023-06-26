import { useContext } from "react";
import { TodoItem } from "../../components/todoItem"
import { TodoContext } from "../../TodoContext";

function TodoList() {

    const {
        searchedTodos,
        id,
        completeTodo,
        deleteTodo,
        isEdit,
        EnabledIsEdit,
        ActualizarTarea,
        loading,
        error,
    } = useContext(TodoContext);

    return (
        
        <>
            {loading ? <p>Estamos cargando...</p> : null}
            {error ? <p>Desesperate, hubo un error!!!!!!</p> : null} 

            

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
        </>

    )
}

export { TodoList }