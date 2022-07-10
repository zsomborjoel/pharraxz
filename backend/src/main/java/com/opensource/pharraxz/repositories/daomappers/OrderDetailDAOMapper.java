package com.opensource.pharraxz.repositories.daomappers;

import com.opensource.pharraxz.entities.OrderDetail;
import com.opensource.pharraxz.entities.Product;
import io.r2dbc.spi.Row;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.function.Function;

@Component
@RequiredArgsConstructor
public class OrderDetailDAOMapper implements Function<Row, OrderDetail> {

    private final ProductDAOMapper productDAOMapper;

    @Override
    public OrderDetail apply(final Row row) {
        Long orderDetailId = row.get("order_detail_id", Long.class);
        Long quantity = row.get("quantity", Long.class);
        String orderType = row.get("order_type", String.class);
        LocalDate startDate = row.get("start_date", LocalDate.class);
        LocalDate endDate = row.get("end_date", LocalDate.class);

        Product product = productDAOMapper.apply(row);

        return OrderDetail.builder()
                .orderDetailId(orderDetailId)
                .product(product)
                .quantity(quantity)
                .oderType(orderType)
                .startDate(startDate)
                .endDate(endDate)
                .build();
    }

}
