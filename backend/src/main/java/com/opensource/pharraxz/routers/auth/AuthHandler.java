package com.opensource.pharraxz.routers.auth;

import com.opensource.pharraxz.configs.security.CustomUserDetails;
import com.opensource.pharraxz.services.AuthService;
import com.opensource.pharraxz.services.RoleService;
import com.opensource.pharraxz.utils.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

@Component
@RequiredArgsConstructor
public class AuthHandler {

    private final JWTUtil jwtUtil;
    private final AuthService authService;
    private final RoleService roleService;

    @NonNull
    public Mono<ServerResponse> handleLogin(@NonNull ServerRequest request) {
        Mono<AuthResponseDTO> authResponseDTO =
                request.bodyToMono(AuthRequest.class)
                        .flatMap(authService::getUserFromRequest)
                        .map(user -> new CustomUserDetails(user.getUsername(), user.getPassword()))
                        .flatMap(this::loadRelations)
                        .map(jwtUtil::generateToken)
                        .map(AuthResponseDTO::new);

        return ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).body(authResponseDTO, AuthResponseDTO.class);
    }

    private Mono<CustomUserDetails> loadRelations(final CustomUserDetails item) {
        return Mono.just(item)
                .zipWith(roleService.getRoleNamesFromUsername(item.getUsername()).collectList())
                .map(result -> {
                     CustomUserDetails customUserDetails = result.getT1();
                     customUserDetails.setRoleNames(result.getT2());
                     return customUserDetails;
                });
    }

}
