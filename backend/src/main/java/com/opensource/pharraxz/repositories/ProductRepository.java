package com.opensource.pharraxz.repositories;

import com.opensource.pharraxz.entities.Product;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends ReactiveCrudRepository<Product, String> {
}
