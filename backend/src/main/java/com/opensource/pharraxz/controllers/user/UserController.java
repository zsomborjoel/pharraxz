package com.opensource.pharraxz.controllers.user;

import com.opensource.pharraxz.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;

    @GetMapping
    public Flux<UserDTO> getAllUser() {
        return userService.findAll().map(userMapper::toDTO);
    }

}
