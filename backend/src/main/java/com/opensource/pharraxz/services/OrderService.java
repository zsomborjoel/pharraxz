package com.opensource.pharraxz.services;

import com.opensource.pharraxz.controllers.order.OrderDetailMapper;
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
import reactor.util.function.Tuple2;

import java.time.LocalDateTime;
import java.util.Collections;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final ProductService productService;
    private final OrderRepository orderRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final CustomOrderDetailRepositoryImpl doctorOrderDetailRepository;
    private final OrderDetailMapper orderDetailMapper;

    public Mono<Void> deleteOrderDetailById(final Long id) {
        return orderDetailRepository.deleteById(id);
    }

    public Flux<Order> getAll() {
        Flux<Order> orderFlux = orderRepository.findAll();
        return orderFlux.flatMap(this::loadRelations);
    }

    public Mono<Order> saveOrderRequest(final OrderRequest orderRequest) {
        final Mono<Order> orderMono = Mono.just(orderRequest)
                .flatMap(this::findOrCreate)
                .flatMap(this::save);

        final Mono<OrderDetail> orderDetailMono = orderMono.zipWith(productService.findById(orderRequest.getOrderDetail().getProduct().getName()))
                .map(tuple -> { // Overwrite on save or on update
                    final OrderDetail orderDetail = orderDetailMapper.toEntity(orderRequest.getOrderDetail());
                    orderDetail.setOrderId(tuple.getT1().getOrderId());
                    orderDetail.setProductId(tuple.getT2().getName());
                    return orderDetail;
                })
                .flatMap(this::save);

        return orderMono.zipWith(orderDetailMono)
                .log("service")
                .map(tuple -> Order.builder()
                        .orderId(tuple.getT1().getOrderId())
                        .userId(tuple.getT1().getOrderId())
                        .description(tuple.getT1().getDescription())
                        .createdDate(tuple.getT1().getCreatedDate())
                        .lastModifiedDate(tuple.getT1().getLastModifiedDate())
                        .orderDetails(Collections.singletonList(tuple.getT2()))
                        .build());
    }

    public Mono<Order> findOrCreate(final OrderRequest request) {
        final Order order = Order.builder()
                .orderId(request.getOrderId())
                .userId(request.getUserId())
                .description(request.getDescription())
                .createdDate(LocalDateTime.now())
                .build();

        if (request.getOrderId() == null) {
            return Mono.just(order);
        }

        order.setOrderId(null); // if order not present
        return orderRepository.findById(request.getOrderId())
                .switchIfEmpty(Mono.just(order));
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
