package com.opensource.pharraxz.repositories.custom.product;

import com.opensource.pharraxz.entities.Product;
import reactor.core.publisher.Flux;

public interface CustomProductRepository {
    Flux<Product> findAll();
}
