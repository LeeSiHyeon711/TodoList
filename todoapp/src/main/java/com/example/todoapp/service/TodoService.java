package com.example.todoapp.service;

import org.springframework.stereotype.Service;
import com.example.todoapp.entity.Todo;
import com.example.todoapp.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import java.util.List;
import java.time.LocalDateTime;
import java.util.Optional;

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
                .name(todo.getName())
                .title(todo.getTitle())
                .description(todo.getDescription())
                .status(false)
                .mostImportant(false)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
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
                .name(todo.getName())
                .title(todo.getTitle())
                .description(todo.getDescription())
                .status(todo.getStatus())
                .mostImportant(todo.getMostImportant())
                .createdAt(updateTodo.getCreatedAt())
                .updatedAt(LocalDateTime.now())
                .build();
        return todoRepository.save(requestTodo);
    }

    // Todo 삭제
    public void deleteTodoById(Long id) {
        todoRepository.deleteById(id);
    }
}
