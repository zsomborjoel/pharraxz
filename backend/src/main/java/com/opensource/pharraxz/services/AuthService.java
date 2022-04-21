package com.opensource.pharraxz.services;

import com.opensource.pharraxz.entities.User;
import com.opensource.pharraxz.routers.auth.AuthRequest;
import com.opensource.pharraxz.utils.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JWTUtil jwtUtil;

    public Mono<User> getUserFromRequest(AuthRequest authRequest) {
       return userService.findByUsername(authRequest.getUsername());
    }

}
