package com.opensource.pharraxz.controllers.order;

import com.opensource.pharraxz.entities.Order;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class OrderOverviewMapper {

    private final OrderDetailMapper orderDetailMapper;

    public List<OrderOverviewDTO> toDTOList(Order order) {
        final List<OrderOverviewDTO> orderOverviewDTOS = new ArrayList<>();
        order.getOrderDetails().forEach(dod -> orderOverviewDTOS.add(
                OrderOverviewDTO.builder()
                        .orderId(order.getOrderId())
                        .description(order.getDescription())
                        .orderDetail(orderDetailMapper.toDTO(dod))
                        .build()
        ));

        return orderOverviewDTOS;
    }

}
