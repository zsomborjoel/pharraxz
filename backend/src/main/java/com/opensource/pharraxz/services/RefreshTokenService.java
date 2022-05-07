package com.opensource.pharraxz.services;

import com.opensource.pharraxz.configs.security.CustomUserDetails;
import com.opensource.pharraxz.entities.RefreshToken;
import com.opensource.pharraxz.exceptions.TokenRefreshException;
import com.opensource.pharraxz.repositories.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    @Value("${security.jjwt.refresh-expiration}")
    private long refreshExpirationTime;

    private final RefreshTokenRepository refreshTokenRepository;

    public Mono<RefreshToken> findByToken(final String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public Mono<RefreshToken> createRefreshToken(final CustomUserDetails userDetails) {
        final RefreshToken refreshToken = RefreshToken.builder()
                .expiryDate(Instant.now().plusMillis(refreshExpirationTime))
                .token(UUID.randomUUID().toString())
                .userId(userDetails.getUserId())
                .build();

        return refreshTokenRepository.save(refreshToken);
    }

    public Mono<Boolean> verifyExpiration(final RefreshToken token) {
        if (token.getExpiryDate().isBefore(Instant.now())) {
            refreshTokenRepository.delete(token);
            throw new TokenRefreshException(token.getToken(), "Refresh token was expired. Please make a new signin request");
        }
        return Mono.just(true);
    }

}
