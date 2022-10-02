package com.opensource.pharraxz.services;

import com.opensource.pharraxz.entities.User;
import com.opensource.pharraxz.entities.UserRole;
import com.opensource.pharraxz.repositories.UserRoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class UserRoleService {

    private final UserRoleRepository userRoleRepository;

    public Mono<Void> delete(final Long userId) {
        return userRoleRepository.deleteById(userId);
    }

    public Mono<UserRole> save(final User user) {
        if (Objects.isNull(user.getId())) {
            throw new IllegalArgumentException("User id should not be null");
        }

        return Mono.just(user)
                .zipWith(userRoleRepository.findById(user.getId())
                        .switchIfEmpty(userRoleRepository.save(
                                UserRole.builder() // if user_role not exists insert
                                        .userId(user.getId())
                                        .roleId(user.getRoleId())
                                        .build()
                                        .setAsNew()
                        )))
                .flatMap(tuple -> userRoleRepository.save( // if user_role exists update
                        UserRole.builder()
                                .userId(user.getId())
                                .roleId(user.getRoleId())
                                .build()
                ));
    }

}