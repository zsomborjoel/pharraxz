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

import java.time.LocalDateTime;

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

    public Mono<OrderDetail> saveOrderRequest(final OrderRequest orderRequest) {
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
                .map(tuple -> {
                    final OrderDetail orderDetail = orderDetailMapper.toEntity(orderRequest.getOrderDetail());
                    orderDetail.setOrderId(tuple.getT1().getOrderId());
                    orderDetail.setProductId(tuple.getT2().getName());
                    return orderDetail;
                })
                .flatMap(this::save)
                .single();
    }

    public Mono<Order> findOrCreate(final OrderRequest request) {
        final Order order = Order.builder()
                .orderId(request.getOrderId())
                .userId(request.getUserId())
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
