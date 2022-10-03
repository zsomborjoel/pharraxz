package com.opensource.pharraxz.repositories.custom.order;

import com.opensource.pharraxz.entities.Order;
import com.opensource.pharraxz.repositories.daomappers.OrderDAOMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
@RequiredArgsConstructor
public class CustomOrderRepositoryImpl implements CustomOrderRepository {

    private final DatabaseClient client;
    private final OrderDAOMapper mapper;

    @Override
    public Flux<Order> findAllByUserId(final Long userId) {
        final String query = """
                select o.*
                from orders o
                where o.user_id = :userId""";

        return client.sql(query)
                .bind("userId", userId)
                .map(mapper)
                .all();
    }

}
