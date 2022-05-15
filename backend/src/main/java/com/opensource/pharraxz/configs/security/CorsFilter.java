package com.opensource.pharraxz.configs.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.config.CorsRegistry;
import org.springframework.web.reactive.config.WebFluxConfigurer;

@Configuration
public class CorsFilter implements WebFluxConfigurer {
    private static final String[] CORS_HEADERS = {"Authorization", "Cache-Control", "Content-Type"};
    private static final String[] CORS_METHODS = {"GET", "POST", "PUT", "DELETE", "PATCH"};

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods(CORS_METHODS)
                .allowedHeaders(CORS_HEADERS);
    }

}
