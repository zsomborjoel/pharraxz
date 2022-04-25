package com.opensource.pharraxz.controllers.auth;

import com.opensource.pharraxz.services.AuthService;
import com.opensource.pharraxz.services.RefreshTokenService;
import com.opensource.pharraxz.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final AuthService authService;
    private final RefreshTokenService refreshTokenService;

    @PostMapping("/login")
    public Mono<AuthResponseDTO> login(@Valid @RequestBody final AuthRequest request) {
        return Mono.just(request)
                .flatMap(authRequest -> userService.getUserByUsername(authRequest.getUsername()))
                .filter(user -> authService.isValidUser(request, user))
                .map(authService::mapToUserDetails)
                .flatMap(authService::loadRolesToUserDetails)
                .flatMap(authService::getAuthResponseDTOFromUserDetails);
    }

    @PostMapping("/refresh")
    public Mono<RefreshTokenDTO> refresh(@Valid @RequestBody final RefreshRequest request) {
        return refreshTokenService.findByToken(request.getRefreshToken())
                .filterWhen(refreshTokenService::verifyExpiration)
                .zipWhen(rt -> userService.findById(rt.getUserId()))
                .map(authService::getRefreshTokenDTOUserPair)
                .map(authService::generateJwtByUser);
    }

}
