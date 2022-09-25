package com.opensource.pharraxz.services;

import com.opensource.pharraxz.entities.Supplier;
import com.opensource.pharraxz.exceptions.EntityNotFoundException;
import com.opensource.pharraxz.repositories.SupplierRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class SupplierService {

    private final SupplierRepository supplierRepository;

    public Mono<Supplier> findById(final Long supplierId) {
        return supplierRepository.findById(supplierId)
                .switchIfEmpty(Mono.error(new EntityNotFoundException(Supplier.class, supplierId)));
    }

    public Flux<Supplier> getAll() {
        return supplierRepository.findAll();
    }

    public Mono<Void> deleteById(final Long id) {
        return supplierRepository.deleteById(id);
    }

    public Mono<Supplier> save(final Supplier supplier) {
        return supplierRepository.save(supplier);
    }

}
