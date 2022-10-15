package com.opensource.pharraxz.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class InvalidPathException extends RuntimeException {

    public InvalidPathException () {
    }

    public InvalidPathException(final String errorMessage) {
        super(errorMessage);
    }

}