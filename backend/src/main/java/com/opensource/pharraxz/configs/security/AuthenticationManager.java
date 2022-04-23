package com.opensource.pharraxz.configs.security;

import com.opensource.pharraxz.utils.JWTUtil;
import io.jsonwebtoken.Claims;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import java.util.List;

@Component
@AllArgsConstructor
public class AuthenticationManager implements ReactiveAuthenticationManager {

    private final JWTUtil jwtUtil;

    @Override
    public Mono<Authentication> authenticate(Authentication authentication) {
        final String authToken = authentication.getCredentials().toString();
        final boolean validToken = jwtUtil.validateToken(authToken);
        if (validToken) {
            final String username = jwtUtil.getUsernameFromToken(authToken);
            final Claims claims = jwtUtil.getAllClaimsFromToken(authToken);
            final List<String> rolesMap = claims.get("role", List.class);

            return Mono.just(new UsernamePasswordAuthenticationToken(
                    username,
                    null,
                    rolesMap.stream().map(SimpleGrantedAuthority::new).toList()
            ));
        }
        return Mono.empty();
    }

}
