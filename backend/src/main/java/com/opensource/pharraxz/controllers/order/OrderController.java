package com.opensource.pharraxz.controllers.order;

import com.opensource.pharraxz.entities.Order;
import com.opensource.pharraxz.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping(value = "/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService pharmaOrderService;

    @GetMapping("/doctor")
    public Flux<Order> getAllDoctorOrders() {
        return pharmaOrderService.getAll();
    }

}
