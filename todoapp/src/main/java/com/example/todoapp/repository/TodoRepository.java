package com.example.todoapp.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.todoapp.entity.Todo;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long>{
    
}
