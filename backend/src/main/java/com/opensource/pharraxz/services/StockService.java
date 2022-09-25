package com.opensource.pharraxz.services;

import com.opensource.pharraxz.entities.Stock;
import com.opensource.pharraxz.repositories.StockRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class StockService {

    private final StockRepository stockRepository;

    public Flux<Stock> getAll() {
        return stockRepository.findAll();
    }

    public Mono<Void> deleteById(final Long id) {
        return stockRepository.deleteById(id);
    }

    public Mono<Stock> save(final Stock stock) {
        return stockRepository.save(stock);
    }

}
