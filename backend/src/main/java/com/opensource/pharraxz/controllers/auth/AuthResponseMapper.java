package com.opensource.pharraxz.controllers.auth;

import com.opensource.pharraxz.configs.security.CustomUserDetails;
import com.opensource.pharraxz.entities.RefreshToken;
import com.opensource.pharraxz.utils.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.mapstruct.Mapper;

@Mapper
@RequiredArgsConstructor
public abstract class AuthResponseMapper {

    private final JWTUtil jwtUtil;

    public AuthResponseDTO toAuthResponseDTO(final CustomUserDetails customUserDetails, final RefreshToken refreshToken) {
        return AuthResponseDTO.builder()
                .userId(customUserDetails.getUserId())
                .username(customUserDetails.getUsername())
                .roleNames(customUserDetails.getRoleNames())
                .jwtToken(jwtUtil.generateToken(customUserDetails))
                .refreshToken(refreshToken.getToken())
                .build();
    }

}
