package com.opensource.pharraxz.repositories;

import com.opensource.pharraxz.entities.PharmaProduct;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PharmaProductRepository extends ReactiveCrudRepository<PharmaProduct, Long> {
}
