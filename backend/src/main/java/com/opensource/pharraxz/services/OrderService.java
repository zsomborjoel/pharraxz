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
                .map(request -> Order.builder()
                        .orderId(request.getOrderId())
                        .description(request.getDescription())
                        .createdDate(LocalDateTime.now())
                        .build())
                .flatMap(this::findOrSave)
                .zipWith(productService.findById(orderRequest.getOrderDetailDTO().getProduct().getName()))
                .map(tuple -> OrderDetail.builder()
                        .orderId(tuple.getT1().getOrderId())
                        .oderType(orderRequest.getOrderDetailDTO().getOderType())
                        .product(tuple.getT2())
                        .quantity(orderRequest.getOrderDetailDTO().getQuantity())
                        .startDate(orderRequest.getOrderDetailDTO().getStartDate())
                        .endDate(orderRequest.getOrderDetailDTO().getEndDate())
                        .build())
                .flatMap(this::findOrSave)
                .then(Mono.empty());
    }

    public Mono<Order> findOrSave(final Order order) {
        return orderRepository.findById(order.getOrderId())
                .switchIfEmpty(orderRepository.save(order));
    }

    public Mono<OrderDetail> findOrSave(final OrderDetail orderDetail) {
        return orderDetailRepository.findById(orderDetail.getOrderDetailId())
                .switchIfEmpty(orderDetailRepository.save(orderDetail));
    }

    private Mono<Order> loadRelations(final Order order) {
        return Mono.just(order)
                .zipWith(doctorOrderDetailRepository.findAllByOrderId(order.getOrderId()).collectList())
                .map(result -> result.getT1().setOrderDetails(result.getT2()));
    }

}
