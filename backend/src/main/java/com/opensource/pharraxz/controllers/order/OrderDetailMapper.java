package com.opensource.pharraxz.controllers.order;

import com.opensource.pharraxz.controllers.product.ProductMapper;
import com.opensource.pharraxz.entities.OrderDetail;
import org.mapstruct.Mapper;

@Mapper(uses = {ProductMapper.class})
public interface OrderDetailMapper {

    OrderDetailDTO toDTO(OrderDetail orderDetail);

    OrderDetail toEntity(OrderDetailDTO orderDetailDTO);

}
