package com.opensource.pharraxz.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum OrderType {
    PERSONAL("personal"),
    OTHER("other"),
    DOCTOR("doctor");

    private final String value;
}
