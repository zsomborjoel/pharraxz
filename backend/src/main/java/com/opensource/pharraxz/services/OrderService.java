package com.opensource.pharraxz.services;

import com.opensource.pharraxz.controllers.order.OrderRequest;
import com.opensource.pharraxz.entities.Order;
import com.opensource.pharraxz.entities.OrderDetail;
import com.opensource.pharraxz.repositories.OrderDetailRepository;
import com.opensource.pharraxz.repositories.OrderRepository;
import com.opensource.pharraxz.repositories.custom.order.CustomOrderDetailRepositoryImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final ProductService productService;
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

    public Mono<Void> saveOrderRequest(final OrderRequest orderRequest) {
        return Mono.just(orderRequest)
                .flatMap(this::findOrCreate)
                .map(order -> {
                    // Update with description
                    order.setDescription(orderRequest.getDescription());
                    return order;
                })
                .flatMap(this::save)
                .zipWith(productService.findById(orderRequest.getOrderDetail().getProduct().getName()))
                // Overwrite on save or on update
                .map(tuple -> OrderDetail.builder()
                        .orderDetailId(orderRequest.getOrderDetail().getOrderDetailId())
                        .orderId(tuple.getT1().getOrderId())
                        .oderType(orderRequest.getOrderDetail().getOderType())
                        .productId(tuple.getT2().getName())
                        .quantity(orderRequest.getOrderDetail().getQuantity())
                        .startDate(orderRequest.getOrderDetail().getStartDate())
                        .endDate(orderRequest.getOrderDetail().getEndDate())
                        .build())
                .flatMap(this::save)
                .then(Mono.empty());
    }

    public Mono<Order> findOrCreate(final OrderRequest request) {
        return orderRepository.findById(request.getOrderId())
                .switchIfEmpty(Mono.just(Order.builder()
                        .orderId(request.getOrderId())
                        .userId(request.getUserId())
                        .createdDate(LocalDateTime.now())
                        .build()));
    }

    public Mono<Order> save(final Order order) {
        return orderRepository.save(order);
    }

    public Mono<OrderDetail> save(final OrderDetail orderDetail) {
        return orderDetailRepository.save(orderDetail);
    }

    private Mono<Order> loadRelations(final Order order) {
        return Mono.just(order)
                .zipWith(doctorOrderDetailRepository.findAllByOrderId(order.getOrderId()).collectList())
                .map(result -> result.getT1().setOrderDetails(result.getT2()));
    }

}
