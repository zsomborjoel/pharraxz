package com.opensource.pharraxz.controllers.order;

import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@Accessors(chain = true)
public class DoctorOrderOverviewDTO {

    private Long orderId;
    private String description;
    private List<DoctorOrderDetailDTO> doctorOrderDetail;

}
