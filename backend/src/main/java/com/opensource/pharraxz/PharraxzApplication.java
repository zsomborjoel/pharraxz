package com.opensource.pharraxz;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.function.server.RouterFunction;
import reactor.core.publisher.Mono;

import static org.springframework.web.reactive.function.server.RequestPredicates.path;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;
import static org.springframework.web.reactive.function.server.ServerResponse.ok;

@SpringBootApplication
public class PharraxzApplication {

	public static void main(String[] args) {
		SpringApplication.run(PharraxzApplication.class, args);
	}

	@Bean
	HelloHandler helloHandler() {
		return new HelloHandler();
	}

	@Bean
	RouterFunction<?> routerFunction(HelloHandler helloHandler) {
		return route(path("/hello"), r -> helloHandler.hello()
				.flatMap(b -> ok().syncBody(b)));
	}

	public class HelloHandler {

		public Mono<String> hello() {
			return Mono.just("hello");
		}
	}



}
