package com.opensource.pharraxz.controllers.stock;

import com.opensource.pharraxz.entities.Stock;
import com.opensource.pharraxz.services.StockService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/stock")
@RequiredArgsConstructor
public class StockController {

    private final StockService stockService;
    private final StockMapper stockMapper;

    @GetMapping
    public Flux<StockDTO> getAllStock() {
        return stockService.getAll()
                .map(stockMapper::toDTO);
    }

    @DeleteMapping("/{id}")
    public Mono<Void> deleteStock(@PathVariable Long id) {
        return stockService.deleteById(id);
    }

    @PostMapping
    public Mono<Long> saveStock(@RequestBody StockDTO stockDTO) {
        return Mono.just(stockDTO)
                .map(stockMapper::fromDTO)
                .flatMap(stockService::save)
                .map(Stock::getId);
    }

}
