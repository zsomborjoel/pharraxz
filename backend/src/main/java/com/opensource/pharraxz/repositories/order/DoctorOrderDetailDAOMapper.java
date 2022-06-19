package com.opensource.pharraxz.repositories.order;

import com.opensource.pharraxz.entities.DoctorOrderDetail;
import com.opensource.pharraxz.entities.Product;
import io.r2dbc.spi.Row;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.function.Function;

@Component
public class DoctorOrderDetailDAOMapper implements Function<Row, DoctorOrderDetail> {

    @Override
    public DoctorOrderDetail apply(final Row row) {
        Long id = row.get("doctor_order_detail_id", Long.class);
        String productName = row.get("name", String.class);
        Long quantity = row.get("quantity", Long.class);
        String orderType = row.get("order_type", String.class);
        LocalDate startDate = row.get("start_date", LocalDate.class);
        LocalDate endDate = row.get("end_date", LocalDate.class);

        Product product = Product.builder().name(productName).build();
        return DoctorOrderDetail.builder()
                .id(id)
                .product(product)
                .quantity(quantity)
                .oderType(orderType)
                .startDate(startDate)
                .endDate(endDate)
                .build();
    }

}
