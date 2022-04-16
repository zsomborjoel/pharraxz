package com.opensource.pharraxz.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.util.Date;

@Table("pharma_order_details")
@Getter
@Setter
@ToString
@Accessors(chain = true)
@NoArgsConstructor
public class PharmaOrderDetail {

    @Id
    @Column("order_detail_id")
    private Long orderDetailId;

    @Column("order_id")
    private Long orderId;

    @Column("pharma_product_id")
    private Long pharmaProductId;

    @Column("quantity")
    private Long quantity;

    @Column("order_type")
    private String oderType;

    @Column("start_date")
    private Date startDate;

    @Column("end_date")
    private Date endDate;

}
