package com.opensource.pharraxz.repositories;

import com.opensource.pharraxz.entities.ReleaseAbleCode;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReleaseAbleCodeRepository extends ReactiveCrudRepository<ReleaseAbleCode, String> {
}
