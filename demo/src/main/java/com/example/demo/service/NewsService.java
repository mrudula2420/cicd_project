package com.example.demo.service;

import com.example.demo.dto.NewsCreateRequest;
import com.example.demo.dto.NewsResponse;
import com.example.demo.model.News;
import com.example.demo.repository.NewsRepository;
import org.springframework.stereotype.Service;

@Service
public class NewsService {
    private final NewsRepository newsRepository;

    public NewsService(NewsRepository newsRepository) {
        this.newsRepository = newsRepository;
    }

    public NewsResponse create(NewsCreateRequest req) {
        News news = new News(
                req.getTitle(),
                req.getCategory(),
                req.getDescription(),
                req.getContent(),
                req.getImageBase64(),
                req.isImportant()
        );
        news = newsRepository.save(news);
        return new NewsResponse(
                news.getId(),
                news.getTitle(),
                news.getCategory(),
                news.getDescription(),
                news.getContent(),
                news.getImageBase64(),
                news.isImportant(),
                news.getCreatedAt()
        );
    }

    public java.util.List<NewsResponse> listAll() {
        return newsRepository.findAll().stream()
                .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
                .map(n -> new NewsResponse(
                        n.getId(), n.getTitle(), n.getCategory(), n.getDescription(), n.getContent(),
                        n.getImageBase64(), n.isImportant(), n.getCreatedAt()
                ))
                .toList();
    }

    public void deleteById(Long id) {
        if (!newsRepository.existsById(id)) {
            throw new IllegalArgumentException("News not found");
        }
        newsRepository.deleteById(id);
    }
}