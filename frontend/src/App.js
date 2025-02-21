import './App.css';
import Todo from './Todo';
import React, { useState, useEffect } from "react";
import { Container,List,Paper } from "@mui/material";
import AddTodo from './AddTodo';
import { call } from './service/ApiService';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    call("/api/todos", "GET", null)
    .then((response) => {
      setItems(response);
    });
  }, []);

  const editItem = (item) => {
    call(`/api/todos/${item.id}`, "PUT", item)
    .then(() => {
      setItems((prevItems) => [...prevItems]);
    });
  }

  const deleteItem = (item) => {
    call(`/api/todos/${item.id}`, "DELETE", item)
    .then(() => {
      setItems((prevItems) => prevItems.filter((e) => e.id !== item.id));
    });
  }

  const addItem = (item) => {
    call("/api/todos", "POST", item)
    .then((response) => {
      setItems((prevItems) => [ ...prevItems, response]);
    });
  };

  let todoItems = items.length > 0 && (
    <Paper style={{ margin: 16}}>
      <List>
        {items.map((item) => (
          <Todo item={item}
          key={item.id}
          editItem={editItem}
          deleteItem={deleteItem}/>
        ))}
      </List>
    </Paper>
  );
  return (<div className="App">
          <Container maxWidth="md">
            <AddTodo addItem={addItem}/>
            <div className='TodoList'>{todoItems}</div>
          </Container>
      </div>);
}

export default App;
