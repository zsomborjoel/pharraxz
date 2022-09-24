package com.opensource.pharraxz.controllers.product;

import com.opensource.pharraxz.entities.Product;
import com.opensource.pharraxz.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final ProductMapper productMapper;

    @GetMapping
    public Flux<ProductDTO> getAllProducts() {
        return productService.getAll()
                .map(productMapper::toDTO);
    }

    @DeleteMapping("/{id}")
    public Mono<Void> deleteProduct(@PathVariable Long id) {
        return productService.deleteById(id);
    }

    @PostMapping
    public Mono<Long> save(@RequestBody ProductDTO productDTO) {
        return Mono.just(productDTO)
                .map(productMapper::fromDTO)
                .flatMap(productService::save)
                .map(Product::getId);
    }

}
