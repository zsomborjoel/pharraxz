package com.opensource.pharraxz.controllers.order;

import lombok.Builder;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Builder
@Accessors(chain = true)
public class OrderOverviewDTO {

    private Long orderId;
    private String description;
    private OrderDetailDTO orderDetail;

}
