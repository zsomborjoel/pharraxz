package com.opensource.pharraxz.controllers.order;

import com.opensource.pharraxz.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping(value = "/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final OrderOverviewMapper orderOverviewMapper;

    @GetMapping("/doctor")
    public Flux<OrderOverviewDTO> getAllDoctorOrders() {
        return orderService.getAll()
                .flatMapIterable(orderOverviewMapper::toDTOList);
    }

    @DeleteMapping("/detail")
    public Mono<Void> deleteOrderDetail(@RequestParam Long id) {
        return orderService.deleteOrderDetailById(id);
    }

}
