package com.example.todoapp.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "todo_list")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 고유 번호

    @Column(nullable = false)
    private String title; // Todo 제목y

    @Column(nullable = false)
    private Boolean status = false; // Todo 상태(완료, 미완료)

    @Column(nullable = false)
    private Boolean mostImportant; // 중요 여부
}
