package com.opensource.pharraxz.repositories;

import com.opensource.pharraxz.entities.Supplier;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplierRepository extends ReactiveCrudRepository<Supplier, Long> {
}
