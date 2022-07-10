package com.opensource.pharraxz.repositories;

import com.opensource.pharraxz.entities.OrderDetail;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderDetailRepository extends ReactiveCrudRepository<OrderDetail, Long> {
}
