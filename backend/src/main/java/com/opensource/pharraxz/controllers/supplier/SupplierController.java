package com.opensource.pharraxz.controllers.supplier;

import com.opensource.pharraxz.entities.Supplier;
import com.opensource.pharraxz.services.SupplierService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/suppliers")
@RequiredArgsConstructor
public class SupplierController {

    private final SupplierService supplierService;
    private final SupplierMapper supplierMapper;

    @GetMapping
    public Flux<SupplierDTO> getAllSupplier() {
        return supplierService.getAll()
                .map(supplierMapper::toDTO);
    }

    @DeleteMapping("/{id}")
    public Mono<Void> deleteSupplier(@PathVariable Long id) {
        return supplierService.deleteById(id);
    }

    @PostMapping
    public Mono<Long> saveSupplier(@RequestBody SupplierDTO supplierDTO) {
        return Mono.just(supplierDTO)
                .map(supplierMapper::fromDTO)
                .flatMap(supplierService::save)
                .map(Supplier::getId);
    }

}
