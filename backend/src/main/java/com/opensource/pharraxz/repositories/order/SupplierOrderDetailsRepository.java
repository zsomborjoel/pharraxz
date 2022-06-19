package com.opensource.pharraxz.repositories.order;

import com.opensource.pharraxz.entities.SupplierOrderDetail;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplierOrderDetailsRepository extends ReactiveCrudRepository<SupplierOrderDetail, Long> {

}
