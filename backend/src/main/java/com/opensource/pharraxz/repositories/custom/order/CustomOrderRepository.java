package com.opensource.pharraxz.repositories.custom.order;

import com.opensource.pharraxz.entities.Order;
import reactor.core.publisher.Flux;

public interface CustomOrderRepository {
    Flux<Order> findAllByUserId(Long userId);
}
