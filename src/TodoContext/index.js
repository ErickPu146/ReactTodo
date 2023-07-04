import React, { createContext, useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

const TodoContext = createContext();

const TodoProvider = (props) => {
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
  } = useLocalStorage("TODOS_V1", []);
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [searchValue, setSearchValue] = useState("");
  const [textNewTodo, setTextNewTodo] = useState("");

  useEffect(() => {
    setFilteredTodos(todos);
  }, [loading]);

  const searchedTodos = filteredTodos.filter((todo) => {
    const todoText = todo.text.toLowerCase();
    const searchText = searchValue.toLowerCase();
    return todoText.includes(searchText);
  });

  const addTodo = (textForNewTodo) => {
    const id = (Math.random() + 1).toString(36).substring(7);
    const newTodo = {
      id,
      text: textForNewTodo,
      completed: false,
      toEdit: false,
    };
    saveTodos([...todos, newTodo]);
    setFilteredTodos([...todos, newTodo]);
  };

  const completedTodos = todos.filter((todo) => !!todo.completed).length;
  const totalTodos = todos.length;

  const completeTodo = (id) => {
    const newTodos = [...todos];
    const index = todos.findIndex((todo) => todo.id === id);
    newTodos[index].completed = !newTodos[index].completed;
    saveTodos(newTodos);
  };

  const deleteTodo = (id) => {
    const newTodos = [...todos];
    const index = newTodos.findIndex((todo) => todo.id === id);
    newTodos.splice(index, 1);
    saveTodos(newTodos);
    setFilteredTodos(newTodos)
  };

  const filterSelect = (value) => {
    if (value === "all") {
      setFilteredTodos(todos);
      setSearchValue("");
    } else if (value === "pending") {
      const pendingTodos = todos.filter((todo) => !todo.completed);
      setFilteredTodos(pendingTodos);
      setSearchValue("");
    } else if (value === "completed") {
      const completedTodos = todos.filter((todo) => todo.completed);
      setFilteredTodos(completedTodos);
      setSearchValue("");
    }
  };

  const EnabledIsEdit = (id) => {
    console.log(id)
    const newTodos = [...todos];
    const index = newTodos.findIndex(todo => todo.id === id);
    newTodos[index].toEdit = !newTodos[index].toEdit
    saveTodos(newTodos)
  };

  const editTodo = (event, id) => {
    const newTodos = [...todos];
    const index = newTodos.findIndex(todo => todo.id === id)
    newTodos[index].text = event.target.value;
    saveTodos(newTodos);
  };

  console.log('filtered' ,filteredTodos)
  console.log('todos' ,todos)

  return (
    <TodoContext.Provider
      value={{
        totalTodos,
        completedTodos,
        searchValue,
        setSearchValue,
        filterSelect,
        searchedTodos,
        addTodo,
        deleteTodo,
        editTodo,
        EnabledIsEdit,
        completeTodo,
        textNewTodo,
        setTextNewTodo,
        loading,
        error,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export { TodoProvider, TodoContext };
