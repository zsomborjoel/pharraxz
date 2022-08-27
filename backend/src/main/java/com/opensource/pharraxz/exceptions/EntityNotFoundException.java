package com.opensource.pharraxz.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class EntityNotFoundException extends RuntimeException {

    public EntityNotFoundException(Class<?> clazz, Object id) {
        super(String.format("%s was not found with id: [%s]", clazz.getName(), id));
    }

}