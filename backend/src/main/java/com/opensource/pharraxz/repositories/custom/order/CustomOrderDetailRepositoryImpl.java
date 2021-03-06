package com.opensource.pharraxz.repositories.custom.order;

import com.opensource.pharraxz.entities.OrderDetail;
import com.opensource.pharraxz.repositories.daomappers.OrderDetailDAOMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
@RequiredArgsConstructor
public class CustomOrderDetailRepositoryImpl implements CustomOrderDetailRepository {

    private final DatabaseClient client;
    private final OrderDetailDAOMapper mapper;

    public Flux<OrderDetail> findAllByOrderId(Long orderId) {
        String query = """
                select od.*, p.*
                from order_details od
                join products p
                on od.pharma_product_id = p.product_id
                where od.order_id = :orderId""";

        return client.sql(query)
                .bind("orderId", orderId)
                .map(mapper)
                .all();
    }
}
