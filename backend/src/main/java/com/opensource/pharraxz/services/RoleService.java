package com.opensource.pharraxz.services;

import com.opensource.pharraxz.configs.security.RoleName;
import com.opensource.pharraxz.entities.Role;
import com.opensource.pharraxz.repositories.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleRepository roleRepository;

    public Flux<RoleName> getRoleNamesFromUsername(String username) {
        return roleRepository.findRolesByUsername(username)
                .map(Role::getRoleName);
    }

}

