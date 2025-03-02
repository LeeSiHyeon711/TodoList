import './App.css';
import StarIcon from "@mui/icons-material/Star";
import React, { useState } from "react";
import { ListItem, Checkbox, ListItemText, ListItemSecondaryAction, IconButton, InputBase } from "@mui/material";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const Todo = (props) => {
    const [item, setItem] = useState(props.item);
    const deleteItem = props.deleteItem;
    const [readOnly, setReadOnly] = useState(true);
    const editItem = props.editItem;
    const setItems = props.setItems;

    const onImportantButtonClick = () => {
        const updatedItem = { ...item, mostImportant: !item.mostImportant };
        setItem(updatedItem);
        editItem(updatedItem);
        setItems((prevItems) => {
            const updatedItems = prevItems.map((i) => (i.id === updatedItem.id ? updatedItem : i));
            return [...updatedItems].sort((a, b) => b.mostImportant - a.mostImportant);
        });
    };

    const checkboxEventHandler = (e) => {
        const updatedItem = { ...item, status: e.target.checked };
        setItem(updatedItem);
        editItem(updatedItem);
    };

    const editEventHandler = (e) => {
        setItem({ ...item, title: e.target.value });
    };

    const turnOnReadOnly = (e) => {
        if (e.key === "Enter" && !readOnly) {
            if (e.target.value.trim() === "") return alert("✏️수정할 내용을 입력해주세요!");
            const updatedItem = { ...item, updatedA: new Date(), title: e.target.value };
            setItem(updatedItem);
            editItem(updatedItem);
            setReadOnly(true);
        }
    };

    const turnOffReadOnly = () => {
        setReadOnly(false);
    };

    const deleteEventHandler = () => {
        if (window.confirm("❗ 이 작업은 취소할 수 없습니다. 정말 삭제하시겠습니까?")){
            deleteItem(item);
        }
    };

    return (
        <ListItem>
            <Checkbox checked={item.status} onChange={checkboxEventHandler} />
            <ListItemText>
                <InputBase
                    inputProps={{
                        "aria-label": "naked",
                        readOnly: readOnly
                    }}
                    onClick={turnOffReadOnly}
                    onKeyDown={turnOnReadOnly}
                    onChange={editEventHandler}
                    type="text"
                    id={item.id}
                    name={item.id}
                    value={item.title}
                    multiline={true}
                    fullWidth={true}
                />
            </ListItemText>
            <ListItemSecondaryAction>
            <span style={{ fontSize: "12px", color: "#888", marginRight: "10px" }}>{item.updatedAt}</span>
            <IconButton aria-label="Important Todo" onClick={onImportantButtonClick}>
                    {item.mostImportant ? (
                        <StarIcon className="star-icon" style={{ color: "gold" }} />
                    ) : (
                        <StarBorderIcon className="star-icon" style={{ color: "gold" }} />
                    )}
                </IconButton>
                <IconButton aria-label="Delete Todo" onClick={deleteEventHandler}>
                    <DeleteOutlined />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default Todo;
