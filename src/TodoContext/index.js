import React, { createContext, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { useContador } from './useContador';

const TodoContext = createContext();

const TodoProvider = (props) => {
    const {
        item: todos,
        saveItem: saveTodos,
        loading,
        error,
    } = useLocalStorage('TODOS_V1', [])
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
        <TodoContext.Provider value={{
            totalTodos,
            completedTodos,
            searchValue,
            setSearchValue,
            filterSelect,
            searchedTodos,
            addTodo,
            deleteTodo,
            ActualizarTarea,
            EnabledIsEdit,
            completeTodo,
            id,
            isEdit,
            textNewTodo,
            setTextNewTodo,
            loading,
            error,
        }}>
            {props.children}
        </TodoContext.Provider>
    );
}




export { TodoProvider, TodoContext};
