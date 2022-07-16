package com.opensource.pharraxz.controllers.order;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class OrderRequest {
    private Long orderId;
    private Long userId;
    private String description;
    private OrderDetailDTO orderDetailDTO;
}
