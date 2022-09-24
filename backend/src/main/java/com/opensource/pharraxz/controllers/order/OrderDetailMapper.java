package com.opensource.pharraxz.controllers.order;

import com.opensource.pharraxz.controllers.product.ProductMapper;
import com.opensource.pharraxz.entities.OrderDetail;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(uses = {ProductMapper.class})
public interface OrderDetailMapper {

    OrderDetailDTO toDTO(OrderDetail orderDetail);

    @Mapping(target = "orderId", ignore = true)
    @Mapping(target = "productId", source = "product.id")
    OrderDetail fromDTO(OrderDetailDTO orderDetailDTO);

}
