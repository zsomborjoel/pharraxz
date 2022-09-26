package com.opensource.pharraxz.repositories.daomappers;

import com.opensource.pharraxz.entities.User;
import io.r2dbc.spi.Row;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class UserDAOMapper implements Function<Row, User> {

    @Override
    public User apply(final Row row) {
        final Long userId = row.get("user_id", Long.class);
        final String firstname = row.get("firstname", String.class);
        final String lastname = row.get("lastname", String.class);
        final String username = row.get("username", String.class);
        final String password = row.get("password", String.class);
        final Long userPositionId = row.get("user_position_id", Long.class);
        final Long roleId = row.get("role_id", Long.class);

        return User.builder()
                .id(userId)
                .firstname(firstname)
                .lastname(lastname)
                .username(username)
                .password(password)
                .userPositionId(userPositionId)
                .roleId(roleId)
                .build();
    }

}
