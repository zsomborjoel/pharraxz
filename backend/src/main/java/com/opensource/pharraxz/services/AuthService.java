package com.opensource.pharraxz.services;

import com.opensource.pharraxz.configs.security.CustomUserDetails;
import com.opensource.pharraxz.controllers.auth.AuthRequest;
import com.opensource.pharraxz.controllers.auth.RefreshTokenDTO;
import com.opensource.pharraxz.entities.RefreshToken;
import com.opensource.pharraxz.entities.User;
import com.opensource.pharraxz.exceptions.UnauthorizedLoginException;
import com.opensource.pharraxz.utils.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.util.function.Tuple2;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JWTUtil jwtUtil;
    private final RoleService roleService;
    private final RefreshTokenService refreshTokenService;
    private final PasswordEncoder passwordEncoder;

    public Mono<Tuple2<CustomUserDetails, RefreshToken>> prepareAuthDetails(final User user) {
        final CustomUserDetails userDetails = new CustomUserDetails(user.getUserId(), user.getUsername(), user.getPassword());
        return Mono.just(userDetails)
                .zipWith(roleService.getRoleNamesFromUsername(userDetails.getUsername()).collectList())
                .map(result -> {
                    userDetails.setRoleNames(result.getT2());
                    return userDetails;
                })
                .zipWith(refreshTokenService.createRefreshToken(userDetails));
    }

    public RefreshTokenDTO generateJwtByUser(final Tuple2<RefreshToken, User> tuple) {
        final RefreshTokenDTO refreshTokenDTO = RefreshTokenDTO.builder()
                .refreshToken(tuple.getT1().getToken())
                .build();
        final User user = tuple.getT2();

        final CustomUserDetails userDetails = CustomUserDetails.builder()
                .userId(user.getUserId())
                .username(user.getUsername())
                .password(user.getPassword())
                .build();
        refreshTokenDTO.setJwtToken(jwtUtil.generateToken(userDetails));

        return refreshTokenDTO;
    }

    public boolean isValidUser(final AuthRequest request, final User user) {
        if (!(StringUtils.equals(user.getUsername(), request.getUsername()) &&
                passwordEncoder.matches(request.getPassword(), user.getPassword()))) {
            throw new UnauthorizedLoginException();
        }
        return true;
    }

}
