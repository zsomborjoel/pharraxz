package com.opensource.pharraxz.controllers.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@ControllerAdvice
public class WebExceptionHandler {

    @ExceptionHandler
    @ResponseBody
    public Mono<ResponseEntity<String>> catchErrors(Exception e, ServerWebExchange ex) {
        return Mono.just(
                ResponseEntity.badRequest().body(e.getMessage())
        );
    }

}
