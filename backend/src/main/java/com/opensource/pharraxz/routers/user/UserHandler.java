package com.opensource.pharraxz.routers.user;

import com.opensource.pharraxz.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Component
@RequiredArgsConstructor
public class UserHandler {

    private final UserService userService;
    private final UserMapper userMapper;

    @NonNull
    public Mono<ServerResponse> handleAllUser(@NonNull ServerRequest request) {
        Flux<UserDTO> allUser = userService.findAll().log().map(userMapper::toDTO);
        return ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).body(allUser, UserDTO.class);
    }

}
