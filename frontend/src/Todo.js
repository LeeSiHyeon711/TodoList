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

    const getCurrentTime = () => {
        const now = new Date();
        return now.toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" }) +
               " " +
               now.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", hour12: false });
    };

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
            const updatedItem = { ...item, updatedAt: getCurrentTime() };
            setItem(updatedItem);
            editItem(updatedItem);
            setReadOnly(true);
        }
    };

    const turnOffReadOnly = () => {
        setReadOnly(false);
    };

    const deleteEventHandler = () => {
        deleteItem(item);
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
