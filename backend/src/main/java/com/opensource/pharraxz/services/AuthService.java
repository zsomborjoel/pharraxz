package com.opensource.pharraxz.services;

import com.opensource.pharraxz.configs.security.CustomUserDetails;
import com.opensource.pharraxz.controllers.auth.AuthRequest;
import com.opensource.pharraxz.controllers.auth.AuthResponseDTO;
import com.opensource.pharraxz.controllers.auth.RefreshTokenDTO;
import com.opensource.pharraxz.entities.RefreshToken;
import com.opensource.pharraxz.entities.User;
import com.opensource.pharraxz.exceptions.UnauthorizedLoginException;
import com.opensource.pharraxz.utils.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.util.Pair;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.util.function.Tuple2;

import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JWTUtil jwtUtil;
    private final RoleService roleService;
    private final RefreshTokenService refreshTokenService;
    private final PasswordEncoder passwordEncoder;

    public Mono<CustomUserDetails> loadRolesToUserDetails(final CustomUserDetails userDetails) {
        return Mono.just(userDetails)
                .zipWith(roleService.getRoleNamesFromUsername(userDetails.getUsername()).collectList())
                .map(result -> {
                    userDetails.setRoleNames(result.getT2());
                    return userDetails;
                });
    }

    public Mono<AuthResponseDTO> getAuthResponseDTOFromUserDetails(final CustomUserDetails userDetails) {
        return Mono.just(userDetails)
                .zipWith(refreshTokenService.createRefreshToken(userDetails))
                .map(getTuple2AuthResponseDTOFunction());
    }

    private Function<Tuple2<CustomUserDetails, RefreshToken>, AuthResponseDTO> getTuple2AuthResponseDTOFunction() {
        return result -> AuthResponseDTO.builder()
                .userId(result.getT1().getUserId())
                .username(result.getT1().getUsername())
                .roleNames(result.getT1().getRoleNames())
                .jwtToken(jwtUtil.generateToken(result.getT1()))
                .refreshToken(result.getT2().getToken())
                .build();
    }

    public Pair<RefreshTokenDTO, User> getRefreshTokenDTOUserPair(final Tuple2<RefreshToken, User> tuple) {
        return Pair.of(
                RefreshTokenDTO.builder().refreshToken(tuple.getT1().getToken()).build(),
                tuple.getT2()
        );
    }

    public RefreshTokenDTO generateJwtByUser(final Pair<RefreshTokenDTO, User> pair) {
        final RefreshTokenDTO refreshTokenDTO = pair.getFirst();
        final User user = pair.getSecond();

        final CustomUserDetails userDetails = new CustomUserDetails(user.getUserId(), user.getUsername(), user.getPassword());
        loadRolesToUserDetails(userDetails);
        refreshTokenDTO.setJwtToken(jwtUtil.generateToken(userDetails));

        return refreshTokenDTO;
    }

    public CustomUserDetails mapToUserDetails(final User user) {
        return new CustomUserDetails(user.getUserId(), user.getUsername(), user.getPassword());
    }

    public boolean isValidUser(final AuthRequest request, final User user) {
        if (!(StringUtils.equals(user.getUsername(), request.getUsername()) &&
                passwordEncoder.matches(request.getPassword(), user.getPassword()))) {
            throw new UnauthorizedLoginException();
        }
        return true;
    }

}
