package com.opensource.pharraxz.controllers.order;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class OrderOverviewDTO {

    private Long orderId;
    private String description;
    private List<OrderDetailDTO> orderDetails;

}
