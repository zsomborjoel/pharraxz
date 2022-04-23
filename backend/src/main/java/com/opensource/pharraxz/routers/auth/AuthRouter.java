package com.opensource.pharraxz.routers.auth;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.web.reactive.function.server.RequestPredicates.POST;
import static org.springframework.web.reactive.function.server.RequestPredicates.accept;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;

@Configuration
public class AuthRouter {

    @Bean
    public RouterFunction<ServerResponse> loginRouter(AuthHandler authHandler) {
        return route(POST("/login").and(accept(MediaType.ALL)), authHandler::handleLogin)
                .andRoute(POST("/refresh").and(accept(MediaType.ALL)), authHandler::handleRefresh);
    }

}
