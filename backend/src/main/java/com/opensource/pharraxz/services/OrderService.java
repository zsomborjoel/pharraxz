package com.opensource.pharraxz.services;

import com.opensource.pharraxz.controllers.order.OrderDetailMapper;
import com.opensource.pharraxz.controllers.order.OrderRequest;
import com.opensource.pharraxz.entities.Order;
import com.opensource.pharraxz.entities.OrderDetail;
import com.opensource.pharraxz.entities.Product;
import com.opensource.pharraxz.repositories.OrderDetailRepository;
import com.opensource.pharraxz.repositories.OrderRepository;
import com.opensource.pharraxz.repositories.custom.order.CustomOrderDetailRepository;
import com.opensource.pharraxz.repositories.custom.order.CustomOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.util.function.Tuple2;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final ProductService productService;
    private final OrderRepository orderRepository;
    private final CustomOrderRepository customOrderRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final CustomOrderDetailRepository customOrderDetailRepository;
    private final OrderDetailMapper orderDetailMapper;

    public Mono<Void> deleteById(final Long id) {
        return orderDetailRepository.deleteById(id);
    }

    public Flux<Order> getAll() {
        Flux<Order> orderFlux = orderRepository.findAll();
        return orderFlux.flatMap(this::loadRelations);
    }

    public Flux<Order> getAllByUserId(final Long userId) {
        Flux<Order> orderFlux = customOrderRepository.findAllByUserId(userId);
        return orderFlux.flatMap(this::loadRelations);
    }

    public Mono<Order> saveOrderRequest(final OrderRequest orderRequest) {
        final Mono<Order> orderMono = Mono.just(orderRequest)
                .flatMap(this::findOrCreate)
                .map(updateOrder(orderRequest))
                .flatMap(this::save);

        final Mono<Product> productMono = productService.findById(orderRequest.getOrderDetail().getProduct().getId());

        final Mono<OrderDetail> orderDetailMono = orderMono.zipWith(productMono)
                .map(updateOrderDetail(orderRequest))
                .flatMap(this::save);

        return orderMono.zipWith(orderDetailMono)
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
                .createdDate(LocalDateTime.now())
                .build();

        if (request.getOrderId() == null) {
            return Mono.just(order); // create
        }

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
                .zipWith(customOrderDetailRepository.findAllByOrderId(order.getOrderId()).collectList())
                .map(result -> result.getT1().setOrderDetails(result.getT2()));
    }
    
    private Function<Order, Order> updateOrder(final OrderRequest orderRequest) {
        return order -> {
            order.setUserId(orderRequest.getUserId());
            order.setDescription(orderRequest.getDescription());
            return order;
        };
    }

    private Function<Tuple2<Order, Product>, OrderDetail> updateOrderDetail(final OrderRequest orderRequest) {
        return tuple -> { // Overwrite on save or on update
            final OrderDetail orderDetail = orderDetailMapper.fromDTO(orderRequest.getOrderDetail());
            orderDetail.setOrderId(tuple.getT1().getOrderId());
            return orderDetail;
        };
    }

}
