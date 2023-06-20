import React, { useState } from 'react';
import { CreateTodoButton } from "../components/createTodoButton/createTodoButton"
import { TodoCounter } from "../components/todoCounter/todoCounter"
import { TodoItem } from "../components/todoItem/todoItem"
import { TodoSearch } from "../components/todoSearch/todoSearch"

function useLocalStorage(itemName, initialValue) {
    const localStorageItem = localStorage.getItem(itemName);
    let parsedItem;

    if (!localStorageItem) {
        localStorage.setItem(itemName, JSON.stringify(initialValue));
        parsedItem = initialValue;
    } else {
        parsedItem = JSON.parse(localStorageItem);
    }

    const [item, setItem] = useState(parsedItem);

    const saveItem = (newItem) => {
        localStorage.setItem(itemName, JSON.stringify(newItem));
        setItem(newItem);
    }
    
    return [item, saveItem];

}

function useContador(items) {
    const [contador, setContador] = useState(items);
    return [contador, setContador]
}


function TodoList() {
    const [todos, saveTodos] = useLocalStorage('TODOS_V1', [])
    const [filteredTodos, setFilteredTodos] = useState(todos);
    const [contador, setContador] = useContador(todos.length);
    const [searchValue, setSearchValue] = useState('');
    const [id, setId] = useState();
    const [isEdit, setIsEdit] = useState(false);
    const [textNewTodo, setTextNewTodo] = useState("");



    const searchedTodos = filteredTodos.filter(
        (todo) => {
            const todoText = todo.text.toLowerCase();
            const searchText = searchValue.toLowerCase();
            return todoText.includes(searchText);
        }
    )

    const addTodo = (textForNewTodo) => {
        const newTodo = {
            identificador: contador,
            text: textForNewTodo,
            completed: false
        }
        setContador(contador + 1);
        saveTodos([...todos, newTodo]);
        setFilteredTodos([...todos, newTodo]);
    }

    const completedTodos = todos.filter(todo => !! todo.completed).length;
    const totalTodos = todos.length;

    const completeTodo = (index) => {
        const newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        saveTodos(newTodos);
    };

    const deleteTodo = (index) => {
        const newTodos = [...todos];

        if(index === todos.length - 1) {
            newTodos.splice(index, 1);
            setContador(contador - 1);
            saveTodos(newTodos)
            setFilteredTodos(newTodos)
        } else {
            newTodos.splice(index, 1);

            for(let i = index; i <= newTodos.length - 1; i++) {
                newTodos[i].identificador = newTodos[i].identificador - 1;
            }
            setContador(contador - 1);
            saveTodos(newTodos);
            setFilteredTodos(newTodos)
        }

    };

    const filterSelect = (value) => {
        if (value === 'all') {
            setFilteredTodos(todos);
            setSearchValue('')
          } else if (value === 'pending') {
            const pendingTodos = todos.filter(todo => !todo.completed);
            setFilteredTodos(pendingTodos);
            setSearchValue('')
          } else if (value === 'completed') {
            const completedTodos = todos.filter(todo => todo.completed);
            setFilteredTodos(completedTodos);
            setSearchValue('')
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
        saveTodos(newTodos);
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