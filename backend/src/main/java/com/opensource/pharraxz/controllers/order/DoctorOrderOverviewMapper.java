package com.opensource.pharraxz.controllers.order;

import com.opensource.pharraxz.entities.Order;
import org.mapstruct.Mapper;

@Mapper(uses = {DoctorOrderDetailMapper.class})
public interface DoctorOrderOverviewMapper {

    DoctorOrderOverviewDTO toDTO(Order order);

}
