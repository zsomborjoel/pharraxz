package com.opensource.pharraxz.services;

import com.opensource.pharraxz.entities.User;
import com.opensource.pharraxz.exceptions.EntityNotFoundException;
import com.opensource.pharraxz.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public Mono<User> findById(final Long userId) {
        return userRepository.findById(userId)
                .switchIfEmpty(Mono.error(new EntityNotFoundException(User.class, userId)));
    }

    public Flux<User> findAll() {
        return userRepository.findAll();
    }

    public Mono<User> getUserByUsername(final String username) {
        return userRepository.findByUsername(username)
                .switchIfEmpty(Mono.error(new EntityNotFoundException(User.class, username)));
    }

    public Mono<Void> deleteById(final Long id) {
        return userRepository.deleteById(id);
    }

    public Mono<User> save(final User user) {
        return userRepository.save(user);
    }

}
