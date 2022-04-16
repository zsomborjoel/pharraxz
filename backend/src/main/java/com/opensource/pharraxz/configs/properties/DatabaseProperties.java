package com.opensource.pharraxz.configs.properties;

import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@ConfigurationProperties("database")
public class DatabaseProperties {
    private String database;
    private String host;
    private int port;
    private String username;
    private String password;
}
