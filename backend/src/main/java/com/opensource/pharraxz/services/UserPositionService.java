package com.opensource.pharraxz.services;

import com.opensource.pharraxz.entities.UserPosition;
import com.opensource.pharraxz.repositories.UserPositionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
@RequiredArgsConstructor
public class UserPositionService {

    private final UserPositionRepository userPositionRepository;

    public Flux<UserPosition> getAll() {
        return userPositionRepository.findAll();
    }

}
