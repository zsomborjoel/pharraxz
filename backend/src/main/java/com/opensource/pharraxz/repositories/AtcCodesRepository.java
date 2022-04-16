package com.opensource.pharraxz.repositories;

import com.opensource.pharraxz.entities.AtcCodes;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AtcCodesRepository extends ReactiveCrudRepository<AtcCodes, Long> {
}
