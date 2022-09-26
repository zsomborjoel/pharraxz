package com.opensource.pharraxz.controllers.role;

import com.opensource.pharraxz.services.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/roles")
@RequiredArgsConstructor
public class RoleController {

    private final RoleService roleService;
    private final RoleMapper roleMapper;

    @GetMapping
    public Flux<RoleDTO> getAllRole() {
        return roleService.getAll()
                .map(roleMapper::toDTO);
    }

}
