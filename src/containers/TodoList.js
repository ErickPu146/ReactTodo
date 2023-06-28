import React, { useState, useEffect } from "react";
import { CreateTodoButton } from "../components/createTodoButton/createTodoButton";
import { TodoCounter } from "../components/todoCounter/todoCounter";
import { TodoItem } from "../components/todoItem/todoItem";
import { TodoSearch } from "../components/todoSearch/todoSearch";
import { Pagination } from "react-bootstrap";

function TodoList() {
  const localStorageTodos = localStorage.getItem("TODOS_V1");
  let parsedTodos;
  let counterLocalTodos;

  if (!localStorageTodos) {
    localStorage.setItem("TODOS_V1", JSON.stringify([]));
    parsedTodos = [];
    counterLocalTodos = 0;
  } else {
    parsedTodos = JSON.parse(localStorageTodos);
    counterLocalTodos = parsedTodos.length;
  }

  const [todos, setTodos] = useState(parsedTodos);
  const [filteredTodos, setFilteredTodos] = useState(parsedTodos);
  const [searchValue, setSearchValue] = useState("");
  const [contador, setContador] = useState(counterLocalTodos);
  const [id, setId] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [textNewTodo, setTextNewTodo] = useState("");

  const searchedTodos = filteredTodos.filter((todo) => {
    const todoText = todo.text.toLowerCase();
    const searchText = searchValue.toLowerCase();
    return todoText.includes(searchText);
  });

  const saveTodos = (newTodos) => {
    console.log(newTodos);
    localStorage.setItem("TODOS_V1", JSON.stringify(newTodos));
    setTodos(newTodos);
    setFilteredTodos(newTodos);
  };

  const addTodo = (textForNewTodo) => {
    const newTodo = {
      identificador: contador,
      text: textForNewTodo,
      completed: false,
    };
    setContador(todos.length + 1);
    saveTodos([...todos, newTodo]);
  };

  const completedTodos = todos.filter((todo) => !!todo.completed).length;
  const totalTodos = todos.length;

  const completeTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    saveTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];

    if (index === todos.length - 1) {
      newTodos.splice(index, 1);
      setContador(contador - 1);
      saveTodos(newTodos);
    } else {
      newTodos.splice(index, 1);

      for (let i = index; i <= newTodos.length - 1; i++) {
        newTodos[i].identificador = newTodos[i].identificador - 1;
      }
      setContador(contador - 1);
      saveTodos(newTodos);
    }
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
    if (isEdit) {
      setId("");
    } else {
      setId(id);
    }
    setIsEdit(!isEdit);
  };

  const ActualizarTarea = (event, index) => {
    const newTodos = [...todos];
    newTodos[index].text = event.target.value;
    saveTodos(newTodos);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const todosByPage = 3;

  const totalPages = Math.ceil(totalTodos / todosByPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * todosByPage;
    const endIndex = startIndex + todosByPage;
    console.log(startIndex, endIndex);
    const currentTodos = todos.slice(startIndex, endIndex);
    setFilteredTodos(currentTodos);
  }, [currentPage, todos]);

  const items = [];

  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => handlePageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <>
      <TodoCounter total={totalTodos} completed={completedTodos} />
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
      <Pagination>
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {items}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination>

      <CreateTodoButton
        textNewTodo={textNewTodo}
        addTodo={addTodo}
        setTextNewTodo={setTextNewTodo}
      />
    </>
  );
}

export { TodoList };
