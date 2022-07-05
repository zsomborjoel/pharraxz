package com.opensource.pharraxz.controllers.order;

import com.opensource.pharraxz.controllers.product.ProductMapper;
import com.opensource.pharraxz.entities.DoctorOrderDetail;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(uses = {ProductMapper.class})
public interface DoctorOrderDetailMapper {

    @Mapping(target = "orderDetailId", source = "id")
    DoctorOrderDetailDTO toDTO(DoctorOrderDetail doctorOrderDetail);

}
