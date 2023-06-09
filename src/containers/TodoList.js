import React, { useState } from 'react';
import { CreateTodoButton } from "../components/CreateTodoButton"
import { TodoCounter } from "../components/TodoCounter"
import { TodoItem } from "../components/TodoItem"
import { TodoSearch } from "../components/TodoSearch"


function TodoList() {
    const [todos, setTodos] = useState([]);
    const [contador, setContador] = useState(1);
    const [id, setId] = useState();
    const [isEdit, setIsEdit] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [value, setValue] = useState("");
    const [filteredTodos, setFilteredTodos] = useState([]);


    const searchedTodos = filteredTodos.filter(
        (todo) => {
            const todoText = todo.text.toLowerCase();
            const searchText = searchValue.toLowerCase();
            return todoText.includes(searchText);
        }
    )

    const addTodo = (text) => {
        const newTodo = {
            identificador: contador,
            text,
            completed: false
        }
        setTodos([...todos, newTodo]);
        setFilteredTodos([...todos, newTodo])
        setContador(contador + 1);
    }

    const completedTodos = todos.filter(todo => !! todo.completed).length;
    const totalTodos = todos.length;

    const completeTodo = (index) => {
        const newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setFilteredTodos(newTodos);
    };

    const deleteTodo = (index) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1); 
        setFilteredTodos(newTodos);
    };

    const filterSelect = (value) => {
        if (value === 'all') {
            setFilteredTodos(todos);
          } else if (value === 'pending') {
            const pendingTodos = todos.filter(todo => !todo.completed);
            setFilteredTodos(pendingTodos);
          } else if (value === 'completed') {
            const completedTodos = todos.filter(todo => todo.completed);
            setFilteredTodos(completedTodos);
          }
    };

    const EnabledIsEdit = (id) => {
        if(isEdit){
            setId("")
        }else{
            setId(id);
        }
        setIsEdit(!isEdit);
    }

    const ActualizarTarea = (event, index) => {
        const newTodos = [...todos];
        newTodos[index].text = event.target.value;
        setTodos(newTodos);
    }

    const inputTextNewTodo = (event) => {
        setValue(event.target.value);
    }



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
                        onComplete={completeTodo}
                        onDelete={deleteTodo}
                        isEdit={isEdit}
                        EnabledIsEdit={EnabledIsEdit}
                        ActualizarTarea={ActualizarTarea}
                    />
                ))}
            </ul>
            <CreateTodoButton 
                value={value}
                inputTextNewTodo={inputTextNewTodo}
                addTodo={addTodo}
                setValue={setValue}
            />
        </>

    )
}

export { TodoList }