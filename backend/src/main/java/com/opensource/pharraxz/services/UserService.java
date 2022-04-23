package com.opensource.pharraxz.services;

import com.opensource.pharraxz.entities.User;
import com.opensource.pharraxz.repositories.UserRepository;
import com.opensource.pharraxz.routers.auth.AuthRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public Mono<User> findById(Long userId) {
        return userRepository.findById(userId);
    }

    public Flux<User> findAll() {
        return userRepository.findAll();
    }

    public Mono<User> getUserFromRequest(AuthRequest authRequest) {
        return userRepository.findByUsername(authRequest.getUsername());
    }

}
