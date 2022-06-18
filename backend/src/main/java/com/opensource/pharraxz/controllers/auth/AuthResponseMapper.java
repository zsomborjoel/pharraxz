package com.opensource.pharraxz.controllers.auth;

import com.opensource.pharraxz.configs.security.CustomUserDetails;
import com.opensource.pharraxz.entities.RefreshToken;
import com.opensource.pharraxz.utils.JWTUtil;
import org.mapstruct.Mapper;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper
public abstract class AuthResponseMapper {

    @Autowired
    private JWTUtil jwtUtil;

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
