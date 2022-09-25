package com.opensource.pharraxz.services;

import com.opensource.pharraxz.entities.HospitalWard;
import com.opensource.pharraxz.repositories.HospitalWardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
@RequiredArgsConstructor
public class HospitalWardService {

    private final HospitalWardRepository hospitalWardRepository;

    public Flux<HospitalWard> getAll() {
        return hospitalWardRepository.findAll();
    }

}
