import './App.css';
import Todo from './Todo';
import React, { useState, useEffect } from "react";
import { Container,List,Paper,Grid, TextField } from "@mui/material";
import AddTodo from './AddTodo';
import { call } from './service/ApiService';

function App() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    call("/api/todos", "GET", null)
    .then((response) => {
      setItems(response);
    });
  }, []);

  const getSearchResult = () => {
    if (search.trim() === "") return items;
    return items.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));
  };

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const editItem = (item) => {
    call(`/api/todos/${item.id}`, "PUT", item)
    .then(() => {
      setItems((prevItems) => [...prevItems]);
    });
  };

  const deleteItem = (item) => {
    call(`/api/todos/${item.id}`, "DELETE", item)
    .then(() => {
      setItems((prevItems) => prevItems.filter((e) => e.id !== item.id));
    });
  };

  const addItem = (item) => {
    call("/api/todos", "POST", item)
    .then((response) => {
      setItems((prevItems) => [ ...prevItems, response]);
    });
  };

  const filteredItems = getSearchResult();

  let todoItems = filteredItems.length > 0 && (
    <Paper style={{ margin: 16}}>
      <List>
        {filteredItems.map((item) => (
          <Todo item={item}
          key={item.id}
          editItem={editItem}
          deleteItem={deleteItem}/>
        ))}
      </List>
    </Paper>
  );
  return (
        <div className="App">
          <Container maxWidth="md">
          <TextField
            value={search}
            onChange={onChangeSearch}
            className='searchbar'
            placeholder='검색할 TODO를 입력하세요'
          />
            <div className='Header'>
              <h3>오늘은 📝</h3>
              <h1>{new Date().toDateString()}</h1>
            </div>
            <AddTodo addItem={addItem}/>
            <Grid className='TodoList'>
              {todoItems}
            </Grid>
          </Container>
        </div>
        )};

export default App;
