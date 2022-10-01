package com.opensource.pharraxz.services;

import com.opensource.pharraxz.entities.User;
import com.opensource.pharraxz.exceptions.EntityNotFoundException;
import com.opensource.pharraxz.repositories.UserRepository;
import com.opensource.pharraxz.repositories.custom.user.CustomUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final CustomUserRepository customUserRepository;
    private final PasswordEncoder passwordEncoder;

    public Mono<User> findById(final Long userId) {
        return userRepository.findById(userId)
                .switchIfEmpty(Mono.error(new EntityNotFoundException(User.class, userId)));
    }

    public Flux<User> findAll() {
        return customUserRepository.findAllWithRole();
    }

    public Mono<User> getUserByUsername(final String username) {
        return userRepository.findByUsername(username)
                .switchIfEmpty(Mono.error(new EntityNotFoundException(User.class, username)));
    }

    public Mono<Void> deleteById(final Long id) {
        return userRepository.deleteById(id);
    }

    public Mono<User> save(final User user) {
        if (!Objects.isNull(user.getPassword())) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }

        // insert
        if (Objects.isNull(user.getId())) {
            return userRepository.save(user);
        }

        // update
        return Mono.just(user)
                .zipWith(this.findById(user.getId()))
                .flatMap(tuple -> {
                    final User userRequest = tuple.getT1();
                    final User userDatabase = tuple.getT2();
                    if (Objects.isNull(userRequest.getPassword())) {
                        userRequest.setPassword(userDatabase.getPassword());
                    }

                    return userRepository.save(userRequest);
                });
    }

}
