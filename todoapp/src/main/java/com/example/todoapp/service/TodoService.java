package com.example.todoapp.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.todoapp.entity.Todo;
import com.example.todoapp.repository.TodoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepository todoRepository;

    // 모든 Todo 리스트를 반환
    public List<Todo> getTodoList() {
        return todoRepository.findAll();
    }

    // 특정 Todo 조회
    public Optional<Todo> getTodoById(Long id) {
        return todoRepository.findById(id);
    }

    // Todo 추가
    public Todo addTodo(Todo todo) {
        Todo newTodo = Todo.builder()
                .title(todo.getTitle())
                .status(false)
                .mostImportant(todo.getMostImportant())
                .build();
        return todoRepository.save(newTodo);
    }

    // Todo 수정
    public Todo updateTodoById(Long id, Todo todo) {
        Todo updateTodo = todoRepository.findById(id).orElse(null);
        if (updateTodo == null) {
            return null;
        }
        Todo requestTodo = Todo.builder()
                .id(todo.getId())
                .title(todo.getTitle())
                .status(todo.getStatus())
                .mostImportant(todo.getMostImportant())
                .build();
        return todoRepository.save(requestTodo);
    }

    // Todo 삭제
    public void deleteTodoById(Long id) {
        todoRepository.deleteById(id);
    }
}
