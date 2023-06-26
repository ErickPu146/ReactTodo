import { CreateTodoButton } from "../components/createTodoButton"
import { TodoCounter } from "../components/todoCounter"
import { TodoSearch } from "../components/todoSearch"
import { TodoList } from "../containers/todoList"

const AppUI = () => {

    return (
        <>
            <div className='container-fluid'>
                <div className='container mt-5 text-center d-flex flex-column justify-content-center gap-4 align-items-center'>
                    <TodoCounter/>
                    <TodoSearch/>
                    <TodoList/>
                    <CreateTodoButton/>
                </div>
            </div>
        </>
    );
}

export { AppUI };