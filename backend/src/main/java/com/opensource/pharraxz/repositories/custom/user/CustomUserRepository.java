package com.opensource.pharraxz.repositories.custom.user;

import com.opensource.pharraxz.entities.User;
import reactor.core.publisher.Flux;

public interface CustomUserRepository {
    Flux<User> findAllWithRole();
}
