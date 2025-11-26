package com.example.demo.dto;

import java.time.LocalDateTime;

public class NewsResponse {
    private Long id;
    private String title;
    private String category;
    private String description;
    private String content;
    private String imageBase64;
    private boolean important;
    private LocalDateTime createdAt;

    public NewsResponse() {}

    public NewsResponse(Long id, String title, String category, String description, String content, String imageBase64, boolean important, LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.description = description;
        this.content = content;
        this.imageBase64 = imageBase64;
        this.important = important;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public String getImageBase64() { return imageBase64; }
    public void setImageBase64(String imageBase64) { this.imageBase64 = imageBase64; }
    public boolean isImportant() { return important; }
    public void setImportant(boolean important) { this.important = important; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}