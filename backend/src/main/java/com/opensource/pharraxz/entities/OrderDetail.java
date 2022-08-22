package com.opensource.pharraxz.entities;

import com.opensource.pharraxz.enums.OrderType;
import com.opensource.pharraxz.enums.converters.OrderTypeConverter;
import lombok.*;
import lombok.experimental.Accessors;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import javax.persistence.Convert;
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

    @Column("product_id")
    private String productId;

    @Transient
    private Product product;

    @Column("quantity")
    private Long quantity;

    @Builder.Default
    @Convert(converter = OrderTypeConverter.class)
    @Column("order_type")
    private OrderType orderType = OrderType.OTHER;

    @Column("start_date")
    private LocalDate startDate;

    @Column("end_date")
    private LocalDate endDate;

}