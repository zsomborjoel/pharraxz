package com.opensource.pharraxz.controllers.order;

import com.opensource.pharraxz.entities.Order;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DoctorOrderOverviewMapper {

    private final DoctorOrderDetailMapper doctorOrderDetailMapper;

    public List<DoctorOrderOverviewDTO> toDTOList(Order order) {
        final List<DoctorOrderOverviewDTO> doctorOrderOverviewDTOS = new ArrayList<>();
        order.getDoctorOrderDetail().forEach(dod -> doctorOrderOverviewDTOS.add(
                DoctorOrderOverviewDTO.builder()
                        .orderId(order.getOrderId())
                        .description(order.getDescription())
                        .doctorOrderDetail(doctorOrderDetailMapper.toDTO(dod))
                        .build()
        ));

        return doctorOrderOverviewDTOS;
    }

}
