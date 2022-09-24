package com.opensource.pharraxz.services;

import com.opensource.pharraxz.entities.ReleaseAbleCode;
import com.opensource.pharraxz.exceptions.EntityNotFoundException;
import com.opensource.pharraxz.repositories.ReleaseAbleCodeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class ReleaseAbleCodeService {

    private final ReleaseAbleCodeRepository releaseAbleCodeRepository;

    public Mono<ReleaseAbleCode> findById(final String code) {
        return releaseAbleCodeRepository.findById(code)
                .switchIfEmpty(Mono.error(new EntityNotFoundException(ReleaseAbleCode.class, code)));
    }

    public Flux<ReleaseAbleCode> getAll() {
        return releaseAbleCodeRepository.findAll();
    }

}
