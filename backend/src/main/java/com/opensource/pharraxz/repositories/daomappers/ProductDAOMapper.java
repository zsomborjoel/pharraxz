package com.opensource.pharraxz.repositories.daomappers;

import com.opensource.pharraxz.entities.Product;
import io.r2dbc.spi.Row;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class ProductDAOMapper implements Function<Row, Product> {

    @Override
    public Product apply(final Row row) {
        final String name = row.get("name", String.class);
        final String atc = row.get("atc", String.class);
        final Long supplierId = row.get("supplier_id", Long.class);
        final String packaging = row.get("packaging", String.class);
        final String description = row.get("description", String.class);
        final String distributor = row.get("distributor", String.class);
        final String inn = row.get("inn", String.class);
        final Boolean releasable = row.get("releasable", Boolean.class);
        final String releasableBy = row.get("releasable_by", String.class);

        return Product.builder()
                .name(name)
                .atc(atc)
                .supplierId(supplierId)
                .packaging(packaging)
                .description(description)
                .distributor(distributor)
                .inn(inn)
                .releasable(releasable)
                .releasableBy(releasableBy)
                .build();
    }

}
