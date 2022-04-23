package com.opensource.pharraxz.routers.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RefreshTokenDTO {
    private String jwtToken;
    private String refreshToken;
}
