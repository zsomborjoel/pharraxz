package com.opensource.pharraxz.repositories.order;

import com.opensource.pharraxz.entities.DoctorOrderDetail;
import lombok.RequiredArgsConstructor;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;

@Component
@RequiredArgsConstructor
public class CustomDoctorOrderDetailRepositoryImpl implements CustomDoctorOrderDetailRepository {

    private final DatabaseClient client;
    private final DoctorOrderDetailDAOMapper mapper;

    public Flux<DoctorOrderDetail> findAllByOrderId(Long orderId) {
        String query = "select dod.*, p.name, p.atc " +
                "from doctor_order_details dod " +
                "join products p " +
                "on dod.pharma_product_id = p.product_id " +
                "where order_id = :orderId";

        return client.sql(query)
                .bind("orderId", orderId)
                .map(mapper)
                .all();
    }
}
