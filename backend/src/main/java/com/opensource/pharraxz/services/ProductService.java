package com.opensource.pharraxz.services;

import com.opensource.pharraxz.entities.Product;
import com.opensource.pharraxz.exceptions.EntityNotFoundException;
import com.opensource.pharraxz.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public Mono<Product> findById(final String name) {
        return productRepository.findById(name)
                .switchIfEmpty(Mono.error(new EntityNotFoundException(Product.class, name)));
    }

    public Flux<Product> getAll() {
        return productRepository.findAll();
    }

    public Mono<Void> deleteById(final String name) {
        return productRepository.deleteById(name);
    }

    public Mono<Product> save(final Product product) {
        return productRepository.save(product);
    }

}
