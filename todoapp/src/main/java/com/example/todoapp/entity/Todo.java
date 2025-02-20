package com.example.todoapp.entity;

import java.time.LocalDateTime;

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
    private String name; // 작성자 이름

    @Column(nullable = false)
    private String title; // Todo 제목

    @Column(nullable = false)
    private String description; // Todo 설명

    @Column(nullable = false)
    private Boolean status = false; // Todo 상태(완료, 미완료)

    @Column(nullable = false)
    private LocalDateTime createdAt; // 작성일

    @Column(nullable = false)
    private LocalDateTime updatedAt; // 수정일

    @Column(nullable = false)
    private Boolean mostImportant = false; // 중요 여부
}
