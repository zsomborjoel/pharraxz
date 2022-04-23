package com.opensource.pharraxz.routers.auth;

import com.opensource.pharraxz.configs.security.CustomUserDetails;
import com.opensource.pharraxz.services.AuthService;
import com.opensource.pharraxz.services.RefreshTokenService;
import com.opensource.pharraxz.services.UserService;
import com.opensource.pharraxz.utils.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;
import reactor.util.function.Tuple2;

import java.util.function.Function;

@Component
@RequiredArgsConstructor
public class AuthHandler {

    private final UserService userService;
    private final AuthService authService;
    private final RefreshTokenService refreshTokenService;
    private final JWTUtil jwtUtil;

    @NonNull
    public Mono<ServerResponse> handleLogin(@NonNull ServerRequest request) {
        Mono<AuthResponseDTO> authResponseDTO =
                request.bodyToMono(AuthRequest.class)
                        .log("Started login")
                        .flatMap(userService::getUserFromRequest)
                        .map(user -> new CustomUserDetails(user.getUserId(), user.getUsername(), user.getPassword()))
                        .flatMap(authService::loadRolesToUserDetails)
                        .flatMap(authService::getAuthResponseFromUserDetails);

        return ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).body(authResponseDTO, AuthResponseDTO.class);
    }

    @NonNull
    public Mono<ServerResponse> handleRefresh(@NonNull ServerRequest request) {
        Mono<RefreshTokenDTO> refreshTokenDTO = request.bodyToMono(RefreshRequest.class)
                .log("Started refresh")
                .map(refreshRequest -> RefreshTokenDTO.builder()
                            .refreshToken(refreshRequest.getRefreshToken())
                            .build())
                .cache();

        Mono<String> jwtToken = request.bodyToMono(RefreshRequest.class)
                .flatMap(refreshRequest -> refreshTokenService.findByToken(refreshRequest.getRefreshToken()))
                .flatMap(refreshToken -> userService.findById(refreshToken.getUserId()))
                .flatMap(user -> Mono.just(jwtUtil.generateToken(
                        new CustomUserDetails(user.getUserId(), user.getUsername(), user.getPassword()))));

        return ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).body(Mono.zip(refreshTokenDTO, jwtToken), String.class);
    }

    public Function<Tuple2<RefreshTokenDTO, String>, RefreshTokenDTO> getRefreshTokenDTOWithJwt() {
        return tuple -> {
            RefreshTokenDTO refreshTokenFromMono = tuple.getT1();
            refreshTokenFromMono.setJwtToken(tuple.getT2());
            return refreshTokenFromMono;
        };
    }

}
