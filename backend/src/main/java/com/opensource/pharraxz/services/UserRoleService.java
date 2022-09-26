package com.opensource.pharraxz.services;

import com.opensource.pharraxz.entities.User;
import com.opensource.pharraxz.entities.UserRole;
import com.opensource.pharraxz.repositories.UserRoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class UserRoleService {

    private final UserRoleRepository userRoleRepository;

    @Transactional
    public Mono<UserRole> save(final User user) {
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
