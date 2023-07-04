import { useContext } from "react";
import { TodoItem } from "../../components/todoItem"
import { TodoContext } from "../../TodoContext";
import { TodosLoading } from "../../components/todosLoading";

function TodoList() {

    const {
        searchedTodos,
        completeTodo,
        deleteTodo,
        EnabledIsEdit,
        editTodo,
        loading,
        error,
    } = useContext(TodoContext);

    return (
        
        <>
            {loading ? 
            <>
                <TodosLoading/> 
                <TodosLoading/> 
                <TodosLoading/> 
            </>
            : null}
            {error ? <p>Desesperate, hubo un error!!!!!!</p> : null} 

            

            {   <ul className="list-unstyled row gap-3 w-100">
                {searchedTodos.map((todo, index) => (
                    <TodoItem 
                        key={index}
                        index={index}
                        identificador={todo.id} 
                        item={todo}
                        completeTodo={completeTodo}
                        deleteTodo={deleteTodo}
                        EnabledIsEdit={EnabledIsEdit}
                        editTodo={editTodo}
                    />
                ))}
            </ul>}
        </>

    )
}

export { TodoList }