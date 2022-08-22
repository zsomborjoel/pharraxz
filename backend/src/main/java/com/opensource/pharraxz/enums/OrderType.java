package com.opensource.pharraxz.enums;

import com.opensource.pharraxz.commons.enumconverter.BaseEnumCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum OrderType implements BaseEnumCode<String> {
    PERSONAL("personal"),
    OTHER("other"),
    DOCTOR("doctor");

    private final String value;
}
