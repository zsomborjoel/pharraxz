package com.opensource.pharraxz.repositories;

import com.opensource.pharraxz.entities.PharmaOrderDetail;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PharmaOrderDetailRepository extends ReactiveCrudRepository<PharmaOrderDetail, Long> {
}
