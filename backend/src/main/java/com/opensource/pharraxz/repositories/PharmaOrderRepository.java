package com.opensource.pharraxz.repositories;

import com.opensource.pharraxz.entities.PharmaOrder;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PharmaOrderRepository extends ReactiveCrudRepository<PharmaOrder, Long> {
}
