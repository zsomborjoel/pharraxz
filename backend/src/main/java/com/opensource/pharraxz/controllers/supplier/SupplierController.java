package com.opensource.pharraxz.controllers.supplier;

import com.opensource.pharraxz.services.SupplierService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

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

}
