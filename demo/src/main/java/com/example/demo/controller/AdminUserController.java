package com.example.demo.controller;

import com.example.demo.dto.UserSummary;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminUserController {
    private final UserRepository userRepository;

    public AdminUserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/users")
    public List<UserSummary> listUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(u -> new UserSummary(u.getId(), u.getName(), u.getEmail(), u.getLastLoginAt()))
                .collect(Collectors.toList());
    }
}