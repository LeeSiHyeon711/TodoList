package com.example.todoapp.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import lombok.RequiredArgsConstructor;
import com.example.todoapp.service.TodoService;
import com.example.todoapp.entity.Todo;
import java.util.List;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
public class TodoController {
    
    private final TodoService todoService;

    // 모든 Todo 리스트를 반환
    @GetMapping
    public List<Todo> getTodoList() {
        return todoService.getTodoList();
    }

    // 특정 Todo 조회
    @GetMapping("/{id}")
    public ResponseEntity<Todo> getTodoById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(todoService.getTodoById(id).orElse(null));
    }   

    // Todo 추가
    @PostMapping
    public Todo addTodo(@RequestBody Todo todo) {
        return todoService.addTodo(todo);
    }

    // Todo 수정
    @PutMapping("/{id}")
    public Todo updateTodoById(@PathVariable("id") Long id, @RequestBody Todo todo) {
        return todoService.updateTodoById(id, todo);
    }

    // Todo 삭제
    @DeleteMapping("/{id}")
    public void deleteTodoById(@PathVariable("id") Long id) {
        todoService.deleteTodoById(id);
    }
}
