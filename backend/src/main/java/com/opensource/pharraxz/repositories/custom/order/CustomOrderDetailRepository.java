package com.opensource.pharraxz.repositories.custom.order;

import com.opensource.pharraxz.entities.OrderDetail;
import reactor.core.publisher.Flux;

public interface CustomOrderDetailRepository {
    Flux<OrderDetail> findAllByOrderId(Long orderId);
}
