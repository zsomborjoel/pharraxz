package com.opensource.pharraxz.controllers.order;

import com.opensource.pharraxz.entities.Order;
import com.opensource.pharraxz.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

import javax.annotation.PostConstruct;

@RestController
@RequestMapping(value = "/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService pharmaOrderService;
    private final DoctorOrderOverviewMapper doctorOrderOverviewMapper;

    @GetMapping("/doctor")
    public Flux<Order> getAllDoctorOrders() {
        return pharmaOrderService.getAll();
    }

    @PostConstruct
    void test() {
        doctorOrderOverviewMapper.toDTO(new Order());
    }

}
