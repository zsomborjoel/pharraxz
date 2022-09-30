package com.opensource.pharraxz.repositories.custom.product;

import com.opensource.pharraxz.entities.Product;
import com.opensource.pharraxz.repositories.daomappers.ProductDAOMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
@RequiredArgsConstructor
public class CustomProductRepositoryImpl implements CustomProductRepository {

    private final DatabaseClient client;
    private final ProductDAOMapper mapper;

    @Override
    public Flux<Product> findAll() {
        final String query = """
                select p.*, ac.description atc_description
                from products p
                left join atc_codes ac
                on substring(p.atc, 0, 6) = ac.atc""";

        return client.sql(query)
                .map(mapper)
                .all();
    }

}
