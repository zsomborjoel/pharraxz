package com.opensource.pharraxz.services;

import com.opensource.pharraxz.entities.Product;
import com.opensource.pharraxz.exceptions.EntityNotFoundException;
import com.opensource.pharraxz.repositories.ProductRepository;
import com.opensource.pharraxz.repositories.custom.product.CustomProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CustomProductRepository customProductRepository;

    public Mono<Product> findById(final Long id) {
        return productRepository.findById(id)
                .switchIfEmpty(Mono.error(new EntityNotFoundException(Product.class, id)));
    }

    public Flux<Product> getAll() {
        return customProductRepository.findAll();
    }

    public Mono<Void> deleteById(final Long id) {
        return productRepository.deleteById(id);
    }

    public Mono<Product> save(final Product product) {
        return productRepository.save(product);
    }

}
