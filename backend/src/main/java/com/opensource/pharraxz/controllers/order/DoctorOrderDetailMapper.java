package com.opensource.pharraxz.controllers.order;

import com.opensource.pharraxz.controllers.product.ProductMapper;
import com.opensource.pharraxz.entities.DoctorOrderDetail;
import org.mapstruct.Mapper;

@Mapper(uses = {ProductMapper.class})
public interface DoctorOrderDetailMapper {

    DoctorOrderDetailDTO toDTO(DoctorOrderDetail doctorOrderDetail);

}
