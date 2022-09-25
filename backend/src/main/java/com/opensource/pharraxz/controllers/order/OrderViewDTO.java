package com.opensource.pharraxz.controllers.order;


import com.opensource.pharraxz.controllers.product.ProductDTO;
import com.opensource.pharraxz.enums.OrderType;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class OrderViewDTO {

    private Long orderId;
    private String description;
    private Long id;
    private ProductDTO product;
    private Long quantity;
    private OrderType orderType;
    private LocalDate startDate;
    private LocalDate endDate;

}
