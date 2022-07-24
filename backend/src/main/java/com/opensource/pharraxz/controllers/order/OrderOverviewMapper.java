package com.opensource.pharraxz.controllers.order;

import com.opensource.pharraxz.entities.Order;
import org.mapstruct.Mapper;

@Mapper(uses = {OrderDetailMapper.class})
public interface OrderOverviewMapper {

    OrderOverviewDTO toDTO(Order order);

}
