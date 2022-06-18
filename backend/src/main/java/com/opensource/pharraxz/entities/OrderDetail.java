package com.opensource.pharraxz.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Column;

import java.util.Date;

@Getter
@Setter
@ToString
@Accessors(chain = true)
@NoArgsConstructor
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
    private Date startDate;

    @Column("end_date")
    private Date endDate;

}
