package com.example.demo.service;

import com.example.demo.dto.BlogCreateRequest;
import com.example.demo.dto.BlogResponse;
import com.example.demo.model.Blog;
import com.example.demo.repository.BlogRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BlogService {
    private final BlogRepository blogRepository;

    public BlogService(BlogRepository blogRepository) {
        this.blogRepository = blogRepository;
    }

    public BlogResponse create(BlogCreateRequest req) {
        Blog blog = new Blog(
                req.getTitle(),
                req.getCategory(),
                req.getDescription(),
                req.getContent(),
                req.getImageBase64(),
                req.isImportant()
        );
        blog = blogRepository.save(blog);
        return new BlogResponse(
                blog.getId(),
                blog.getTitle(),
                blog.getCategory(),
                blog.getDescription(),
                blog.getContent(),
                blog.getImageBase64(),
                blog.isImportant(),
                blog.getCreatedAt()
        );
    }

    public List<BlogResponse> listAll() {
        return blogRepository.findAll().stream()
                .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
                .map(b -> new BlogResponse(
                        b.getId(), b.getTitle(), b.getCategory(), b.getDescription(), b.getContent(),
                        b.getImageBase64(), b.isImportant(), b.getCreatedAt()
                ))
                .toList();
    }

    public void deleteById(Long id) {
        if (!blogRepository.existsById(id)) {
            throw new IllegalArgumentException("Blog not found");
        }
        blogRepository.deleteById(id);
    }
}