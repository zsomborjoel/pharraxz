package com.opensource.pharraxz.controllers.order;

import com.opensource.pharraxz.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final OrderViewMapper orderViewMapper;
    private final OrderDetailMapper orderDetailMapper;

    @GetMapping
    public Flux<OrderViewDTO> getAllOrders() {
        return orderService.getAll()
                .flatMapIterable(orderViewMapper::toDTO);
    }

    @DeleteMapping("/detail/{id}")
    public Mono<Void> deleteOrderDetail(@PathVariable Long id) {
        return orderService.deleteOrderDetailById(id);
    }

    @PostMapping
    public Flux<OrderViewDTO> saveOrder(@RequestBody OrderRequest request) {
        return orderService.saveOrderRequest(request)
                .flatMapIterable(orderViewMapper::toDTO);
    }

}
