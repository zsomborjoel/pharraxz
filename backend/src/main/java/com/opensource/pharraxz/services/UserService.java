package com.opensource.pharraxz.services;

import com.opensource.pharraxz.entities.User;
import com.opensource.pharraxz.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public Flux<User> findAll() {
        return userRepository.findAll();
    }

    public Mono<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

}
