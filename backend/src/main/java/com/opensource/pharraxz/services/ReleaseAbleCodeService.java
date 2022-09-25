package com.opensource.pharraxz.services;

import com.opensource.pharraxz.entities.ReleaseAbleCode;
import com.opensource.pharraxz.repositories.ReleaseAbleCodeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
@RequiredArgsConstructor
public class ReleaseAbleCodeService {

    private final ReleaseAbleCodeRepository releaseAbleCodeRepository;

    public Flux<ReleaseAbleCode> getAll() {
        return releaseAbleCodeRepository.findAll();
    }

}
