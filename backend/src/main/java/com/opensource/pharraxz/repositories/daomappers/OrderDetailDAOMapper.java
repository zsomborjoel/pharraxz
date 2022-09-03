package com.opensource.pharraxz.repositories.daomappers;

import com.opensource.pharraxz.entities.OrderDetail;
import com.opensource.pharraxz.entities.Product;
import com.opensource.pharraxz.enums.OrderType;
import io.r2dbc.spi.Row;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Objects;
import java.util.function.Function;

@Component
@RequiredArgsConstructor
public class OrderDetailDAOMapper implements Function<Row, OrderDetail> {

    private final ProductDAOMapper productDAOMapper;

    @Override
    public OrderDetail apply(final Row row) {
        final Long orderDetailId = row.get("order_detail_id", Long.class);
        final Long quantity = row.get("quantity", Long.class);
        final String orderType = row.get("order_type", String.class);
        final LocalDate startDate = row.get("start_date", LocalDate.class);
        final LocalDate endDate = row.get("end_date", LocalDate.class);

        final Product product = productDAOMapper.apply(row);

        return OrderDetail.builder()
                .orderDetailId(orderDetailId)
                .product(product)
                .quantity(quantity)
                .orderType(Objects.isNull(orderType)
                        ? null
                        : OrderType.valueOf(orderType.toUpperCase()))
                .startDate(startDate)
                .endDate(endDate)
                .build();
    }

}
