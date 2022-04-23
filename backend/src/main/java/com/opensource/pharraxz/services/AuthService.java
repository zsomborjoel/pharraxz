package com.opensource.pharraxz.services;

import com.opensource.pharraxz.configs.security.CustomUserDetails;
import com.opensource.pharraxz.routers.auth.AuthResponseDTO;
import com.opensource.pharraxz.utils.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JWTUtil jwtUtil;
    private final RoleService roleService;
    private final RefreshTokenService refreshTokenService;
    public Mono<CustomUserDetails> loadRolesToUserDetails(final CustomUserDetails userDetails) {
        return Mono.just(userDetails)
                .zipWith(roleService.getRoleNamesFromUsername(userDetails.getUsername()).collectList())
                .map(result -> {
                    userDetails.setRoleNames(result.getT2());
                    return userDetails;
                });
    }

    public Mono<AuthResponseDTO> getAuthResponseFromUserDetails(final CustomUserDetails userDetails) {
        return Mono.just(userDetails)
                .zipWith(refreshTokenService.createRefreshToken(userDetails))
                .map(result -> AuthResponseDTO.builder()
                        .refreshToken(result.getT2().getToken())
                        .jwtToken(jwtUtil.generateToken(result.getT1()))
                        .build());
    }

}
