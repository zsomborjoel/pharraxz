package com.opensource.pharraxz.repositories.custom.order;

import com.opensource.pharraxz.entities.DoctorOrderDetail;
import com.opensource.pharraxz.repositories.daomappers.DoctorOrderDetailDAOMapper;
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
        String query = """
                select dod.*, p.*
                from doctor_order_details dod
                join products p
                on dod.pharma_product_id = p.product_id
                where order_id = :orderId""";

        return client.sql(query)
                .bind("orderId", orderId)
                .map(mapper)
                .all();
    }
}
