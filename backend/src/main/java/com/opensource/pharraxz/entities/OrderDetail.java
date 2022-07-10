package com.opensource.pharraxz.entities;

import lombok.*;
import lombok.experimental.Accessors;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDate;

@Getter
@Setter
@SuperBuilder
@ToString
@Accessors(chain = true)
@NoArgsConstructor
@AllArgsConstructor
@Table("order_details")
public class OrderDetail  {

    @Id
    @Column("order_detail_id")
    private Long orderDetailId;

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