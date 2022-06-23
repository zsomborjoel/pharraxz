package com.opensource.pharraxz.repositories;

import com.opensource.pharraxz.entities.DoctorOrderDetail;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorOrderDetailRepository extends ReactiveCrudRepository<DoctorOrderDetail, Long> {
}
