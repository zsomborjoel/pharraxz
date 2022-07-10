package com.opensource.pharraxz.services;

import com.opensource.pharraxz.entities.Order;
import com.opensource.pharraxz.repositories.OrderDetailRepository;
import com.opensource.pharraxz.repositories.OrderRepository;
import com.opensource.pharraxz.repositories.custom.order.CustomOrderDetailRepositoryImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final CustomOrderDetailRepositoryImpl doctorOrderDetailRepository;

    public Mono<Void> deleteOrderDetailById(final Long id) {
        return orderDetailRepository.deleteById(id);
    }

    public Flux<Order> getAll() {
        Flux<Order> orderFlux = orderRepository.findAll();
        return orderFlux.flatMap(this::loadRelations);
    }

    private Mono<Order> loadRelations(final Order order) {
        return Mono.just(order)
                .zipWith(doctorOrderDetailRepository.findAllByOrderId(order.getOrderId()).collectList())
                .map(result -> result.getT1().setOrderDetails(result.getT2()));
    }

}
