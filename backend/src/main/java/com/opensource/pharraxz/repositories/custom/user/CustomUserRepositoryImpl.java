package com.opensource.pharraxz.repositories.custom.user;

import com.opensource.pharraxz.entities.User;
import com.opensource.pharraxz.repositories.daomappers.UserDAOMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
@RequiredArgsConstructor
public class CustomUserRepositoryImpl implements CustomUserRepository {

    private final DatabaseClient client;
    private final UserDAOMapper mapper;

    @Override
    public Flux<User> findAllWithRole() {
        final String query = """
                select u.*, ur.role_id
                from users u
                join user_roles ur
                on u.user_id = ur.user_id""";

        return client.sql(query)
                .map(mapper)
                .all();
    }
}
