package com.opensource.pharraxz.services;

import com.opensource.pharraxz.configs.security.RoleName;
import com.opensource.pharraxz.entities.Role;
import com.opensource.pharraxz.exceptions.EntityNotFoundException;
import com.opensource.pharraxz.repositories.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleRepository roleRepository;

    public Flux<RoleName> getRoleNamesFromUsername(final String username) {
        return roleRepository.findRolesByUsername(username)
                .map(Role::getName)
                .switchIfEmpty(Mono.error(new EntityNotFoundException(Role.class, username)));
    }

    public Flux<Role> getAll() {
        return roleRepository.findAll();
    }

}

