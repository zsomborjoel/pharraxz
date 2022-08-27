package com.opensource.pharraxz.controllers.order;

import com.opensource.pharraxz.controllers.product.ProductMapper;
import com.opensource.pharraxz.entities.Order;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class OrderViewMapper {

    private final ProductMapper productMapper;

    public List<OrderViewDTO> toDTOList(final Order order) {
        List<OrderViewDTO> orderViewDTOS = new ArrayList<>();
        order.getOrderDetails().forEach(od -> orderViewDTOS.add(OrderViewDTO.builder()
                        .id(od.getOrderDetailId())
                        .orderId(order.getOrderId())
                        .description(order.getDescription())
                        .product(productMapper.toDTO(od.getProduct()))
                        .orderType(od.getOrderType())
                        .quantity(od.getQuantity())
                        .startDate(od.getStartDate())
                        .endDate(od.getEndDate())
                        .build()));
        return orderViewDTOS;
    }

}
