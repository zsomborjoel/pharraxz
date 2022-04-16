package com.opensource.pharraxz.repositories;

import com.opensource.pharraxz.entities.HospitalWard;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HospitalWardRepository extends ReactiveCrudRepository<HospitalWard, Long> {
}
