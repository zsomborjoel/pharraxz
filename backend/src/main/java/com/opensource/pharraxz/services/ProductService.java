package com.opensource.pharraxz.services;

import com.opensource.pharraxz.entities.Product;
import com.opensource.pharraxz.exceptions.EntityNotFoundException;
import com.opensource.pharraxz.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public Mono<Product> findById(final Long productId) {
        return productRepository.findById(productId)
                .switchIfEmpty(Mono.error(new EntityNotFoundException()));
    }

}
