package com.opensource.pharraxz.entities;

import lombok.*;
import lombok.experimental.Accessors;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;
import java.util.List;

@Table("orders")
@Getter
@Setter
@SuperBuilder
@ToString
@Accessors(chain = true)
@NoArgsConstructor
public class Order {

    @Id
    @Column("order_id")
    private Long orderId;

    @Column("user_id")
    private Long userId;

    @Column("description")
    private String description;

    @CreatedDate
    @Column("created_date")
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column("last_modified_date")
    private LocalDateTime lastModifiedDate;

    @Transient
    private List<OrderDetail> orderDetails;

}
