package com.opensource.pharraxz.services;

import com.opensource.pharraxz.entities.Order;
import com.opensource.pharraxz.repositories.custom.order.CustomDoctorOrderDetailRepositoryImpl;
import com.opensource.pharraxz.repositories.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final CustomDoctorOrderDetailRepositoryImpl doctorOrderDetailRepository;

    public Flux<Order> getAll() {
        Flux<Order> orderFlux = orderRepository.findAll();
        return orderFlux.flatMap(this::loadRelations);
    }

    private Mono<Order> loadRelations(final Order order) {
        return Mono.just(order)
                .zipWith(doctorOrderDetailRepository.findAllByOrderId(order.getOrderId()).collectList())
                .map(result -> result.getT1().setDoctorOrderDetail(result.getT2()));
    }

}
