package com.opensource.pharraxz.repositories;

import com.opensource.pharraxz.entities.UserPosition;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserPositionRepository extends ReactiveCrudRepository<UserPosition, Long> {
}
