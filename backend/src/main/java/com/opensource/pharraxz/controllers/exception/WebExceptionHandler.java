package com.opensource.pharraxz.controllers.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import reactor.core.publisher.Mono;

import static com.opensource.pharraxz.utils.LogUtil.logOnNext;
import static com.opensource.pharraxz.utils.LogUtil.put;

@Slf4j
@ControllerAdvice
public class WebExceptionHandler {

    @ExceptionHandler
    @ResponseBody
    public Mono<ResponseEntity<String>> catchErrors(final Exception ex) {
        return Mono.just(
                ResponseEntity.badRequest().body(ex.getMessage())
        ).doOnEach(logOnNext(
                result -> log.error("Exception occurred: [{}]", ex.getMessage()))
        ).contextWrite(put("Exception", ex.getMessage()));
    }

}
