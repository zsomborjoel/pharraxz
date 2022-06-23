package com.opensource.pharraxz.repositories.custom.order;

import com.opensource.pharraxz.entities.DoctorOrderDetail;
import reactor.core.publisher.Flux;

public interface CustomDoctorOrderDetailRepository {
    Flux<DoctorOrderDetail> findAllByOrderId(Long orderId);
}
