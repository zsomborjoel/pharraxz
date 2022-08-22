package com.opensource.pharraxz.enums.converters;

import com.opensource.pharraxz.commons.enumconverter.AbstractBaseEnumConverter;
import com.opensource.pharraxz.enums.OrderType;

import javax.persistence.Converter;

@Converter(autoApply = true)
public class OrderTypeConverter extends AbstractBaseEnumConverter<OrderType, String> {

    @Override
    protected OrderType[] getValueList() {
        return OrderType.values();
    }
}
