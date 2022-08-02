package com.opensource.pharraxz.controllers.product;

import com.opensource.pharraxz.controllers.order.*;
import com.opensource.pharraxz.services.OrderService;
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

}
