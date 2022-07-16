package com.opensource.pharraxz.repositories.daomappers;

import com.opensource.pharraxz.entities.Product;
import io.r2dbc.spi.Row;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class ProductDAOMapper implements Function<Row, Product> {

    @Override
    public Product apply(Row row) {
        String productName = row.get("name", String.class);
        String productAtc = row.get("atc", String.class);
        String productRegisterNumber = row.get("register_number", String.class);
        String productPackaging = row.get("packaging", String.class);
        String productDescription = row.get("description", String.class);
        String productInn = row.get("inn", String.class);
        Boolean productReleasable = row.get("releasable", Boolean.class);

        return Product.builder()
                .name(productName)
                .atc(productAtc)
                .registerNumber(productRegisterNumber)
                .packaging(productPackaging)
                .description(productDescription)
                .inn(productInn)
                .releasable(productReleasable)
                .build();
    }

}
