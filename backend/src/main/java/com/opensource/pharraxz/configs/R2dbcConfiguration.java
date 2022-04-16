package com.opensource.pharraxz.configs;


import com.opensource.pharraxz.configs.properties.DatabaseProperties;
import io.r2dbc.postgresql.PostgresqlConnectionConfiguration;
import io.r2dbc.postgresql.PostgresqlConnectionFactory;
import io.r2dbc.spi.ConnectionFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.data.r2dbc.config.AbstractR2dbcConfiguration;
import org.springframework.lang.NonNull;

@Configuration
@Profile(value = "!test")
@RequiredArgsConstructor
public class R2dbcConfiguration extends AbstractR2dbcConfiguration {

    private final DatabaseProperties databaseProperties;

    @Override
    @Bean
    @NonNull
    public ConnectionFactory connectionFactory() {
        return new PostgresqlConnectionFactory(PostgresqlConnectionConfiguration.builder()
                .host(databaseProperties.getHost())
                .port(databaseProperties.getPort())
                .username(databaseProperties.getUsername())
                .password(databaseProperties.getPassword())
                .database(databaseProperties.getDatabase())
                .build());
    }

}
