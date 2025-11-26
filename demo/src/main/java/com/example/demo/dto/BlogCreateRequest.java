package com.example.demo.dto;

public class BlogCreateRequest {
    private String title;
    private String category;
    private String description;
    private String content;
    private String imageBase64;
    private boolean important;

    public BlogCreateRequest() {}

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
}