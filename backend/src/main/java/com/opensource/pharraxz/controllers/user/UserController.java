package com.opensource.pharraxz.controllers.user;

import com.opensource.pharraxz.entities.User;
import com.opensource.pharraxz.entities.UserRole;
import com.opensource.pharraxz.services.UserRoleService;
import com.opensource.pharraxz.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserRoleService userRoleService;
    private final UserMapper userMapper;

    @GetMapping
    public Flux<UserDTO> getAllUser() {
        return userService.findAll().map(userMapper::toDTO);
    }

    @DeleteMapping("/{id}")
    public Mono<Void> deleteUser(@PathVariable Long id) {
        return userRoleService.delete(id)
                .then(userService.deleteById(id));
    }

    @PostMapping
    public Mono<Long> saveUser(@RequestBody UserDTO userDTO) {
        System.out.println(userDTO);
        Mono<User> userMono = Mono.just(userDTO)
                .map(userMapper::fromDTO);

        return userMono
                .flatMap(userService::save)
                .flatMap(userRoleService::save)
                .map(UserRole::getUserId);
    }

}
