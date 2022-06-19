package com.opensource.pharraxz.entities;

import lombok.Getter;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Column;

import java.time.LocalDate;

@Getter
@SuperBuilder
public class OrderDetail {

    @Column("order_id")
    private Long orderId;

    @Transient
    private Product product;

    @Column("quantity")
    private Long quantity;

    @Column("order_type")
    private String oderType;

    @Column("start_date")
    private LocalDate startDate;

    @Column("end_date")
    private LocalDate endDate;

}
