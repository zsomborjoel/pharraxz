package com.opensource.pharraxz.controllers.auth;

import com.opensource.pharraxz.configs.security.RoleName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponseDTO {
    private Long userId;
    private String username;
    private List<RoleName> roleNames;
    private String jwtToken;
    private String refreshToken;
}
