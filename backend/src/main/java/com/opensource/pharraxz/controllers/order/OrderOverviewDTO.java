package com.opensource.pharraxz.controllers.order;

import lombok.Builder;
import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@Builder
@Accessors(chain = true)
public class OrderOverviewDTO {

    private Long orderId;
    private String description;
    private List<OrderDetailDTO> orderDetails;

}
