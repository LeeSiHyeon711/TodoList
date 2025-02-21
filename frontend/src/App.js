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
      setItems(response.sort((a, b) => b.mostImportant - a.mostImportant));
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

  const filteredItems = getSearchResult()

  let todoItems = filteredItems.length > 0 ? (
    <Paper style={{ margin: 16}}>
      <List>
        {filteredItems.map((item) => (
          <Todo
            item={item}
            key={item.id}
            editItem={editItem}
            deleteItem={deleteItem}
            setItems={setItems}
          />
        ))}
      </List>
    </Paper>
  ) : (
    <div style={{ textAlign: "center", marginTop: "25px", color: "#888", fontSize: "18px" }}>
      🚀 아직 등록된 일정이 없어요. 일정을 추가해주세요!<br />
      ⭐ 우선순위 일정이라면 <strong>별 아이콘</strong>을 클릭하고 등록해보세요!<br />
      <strong>꿈을 향해 달려가는 당신을 응원합니다. 💪</strong>
    </div>
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
              <h3>📝 오늘은</h3>
              {/* <h1>{new Date().toDateString()}</h1> */}
              <h1>{new Date().toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric", weekday: "long" })}</h1>
            </div>
            <AddTodo addItem={addItem}/>
            <Grid className='TodoList'>
              {todoItems}
            </Grid>
          </Container>
        </div>
        )};

export default App;
