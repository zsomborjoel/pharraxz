package com.opensource.pharraxz.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Getter
@Setter
@SuperBuilder
@ToString
@Accessors(chain = true)
@Table("supplier_order_details")
public class SupplierOrderDetail extends OrderDetail {

    @Id
    @Column("supplier_order_detail_id")
    private Long id;

}