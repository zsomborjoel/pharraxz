package com.opensource.pharraxz.controllers.order;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {
    private Long orderId;
    private Long userId;
    private String description;
    private OrderDetailDTO orderDetail;
}
