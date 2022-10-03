package com.opensource.pharraxz.controllers.product;

import com.opensource.pharraxz.entities.Product;
import com.opensource.pharraxz.services.ProductService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Tag(name = "Product Controller")
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
    public Mono<Long> saveProduct(@RequestBody ProductDTO productDTO) {
        return Mono.just(productDTO)
                .map(productMapper::fromDTO)
                .flatMap(productService::save)
                .map(Product::getId);
    }

}
