package com.opensource.pharraxz.controllers.order;

import com.opensource.pharraxz.controllers.product.ProductDTO;
import lombok.Data;
import lombok.experimental.Accessors;

import java.time.LocalDate;

@Data
@Accessors(chain = true)
public class DoctorOrderDetailDTO {

    private Long orderDetailId;
    private ProductDTO product;
    private Long quantity;
    private String oderType;
    private LocalDate startDate;
    private LocalDate endDate;

}
