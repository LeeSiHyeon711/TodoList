import React, { useState } from "react";

import { Button, Grid, TextField } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import './App.css';

const AddTodo = (props) => {
    // 사용자의 입력을 저장할 오브젝트
    const [item, setItem] = useState({ title: "", mostImportant: false });
    const addItem = props.addItem;

    // 중요도 버튼 클릭 이벤트 핸들러
    const onImportantButtonClick = () => {
        setItem((prev) => ({ ...prev, mostImportant: !prev.mostImportant }));
    }

    // 엔터키 입력시 호출 함수
    const enterKeyEventHandler = (e) => {
        if (e.key === "Enter") {
            onButtonClick();
        }
    }

    // + 버튼 입력시 호출 함수
    const onButtonClick = () => {
        // console.log("Submitting Item: ", item);
        if (item.title.trim() === "") return alert("✏️추가할 TODO를 입력해주세요!");
        addItem(item);  // App.js의 addItem 함수 호출
        setItem({ title: "", mostImportant: false }) // 입력 필드 초기화
    };

    // 입력 필드 값 변경시 호출 함수
    const onInputChange = (e) => {
        setItem((prev) => ({ ...prev, title: e.target.value }));
    };

    return (
        <Grid container style={{ marginTop: 20}}>

            <Grid item xs={1} md={1} style={{ textAlign: 'center', marginTop: 15 }}>
                {item.mostImportant ? (
                    <StarIcon className="star-icon"
                    onClick={onImportantButtonClick}
                    style={{ color: "gold", cursor: "pointer" }}
                    />
                ) : (
                    <StarBorderIcon className="star-icon"
                    onClick={onImportantButtonClick}
                    style={{ color: "gold", cursor: "pointer" }}
                    />
                )}
            </Grid>

            <Grid xs={10} md={10} item style={{ paddingRight: 10 }}>
                <TextField placeholder="등록할 TODO를 입력해주세요" 
                fullWidth
                onChange={onInputChange}
                onKeyPress={enterKeyEventHandler}
                value={item.title}
                />
            </Grid>
        
            <Grid xs={1} md={1} item >
                <Button fullWidth style={{ height: '100%' }} color="primary" 
                variant="outlined" onClick={onButtonClick}>
                    추가
                </Button>
            </Grid>
        </Grid>
    );
}

export default AddTodo;