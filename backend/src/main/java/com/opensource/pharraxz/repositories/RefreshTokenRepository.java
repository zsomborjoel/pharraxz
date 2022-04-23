package com.opensource.pharraxz.repositories;

import com.opensource.pharraxz.entities.RefreshToken;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface RefreshTokenRepository extends ReactiveCrudRepository<RefreshToken, Long> {
    Mono<RefreshToken> findByToken(String token);
}
