package com.opensource.pharraxz.repositories.daomappers;

import com.opensource.pharraxz.entities.Order;
import io.r2dbc.spi.Row;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.function.Function;

@Component
@RequiredArgsConstructor
public class OrderDAOMapper implements Function<Row, Order> {

    @Override
    public Order apply(final Row row) {
        final Long orderId = row.get("order_id", Long.class);
        final Long userId = row.get("user_id", Long.class);
        final String description = row.get("description", String.class);
        final LocalDateTime createdDate = row.get("created_date", LocalDateTime.class);
        final LocalDateTime lastModifiedDate = row.get("last_modified_date", LocalDateTime.class);

        return Order.builder()
                .orderId(orderId)
                .userId(userId)
                .description(description)
                .createdDate(createdDate)
                .lastModifiedDate(lastModifiedDate)
                .build();
    }

}
