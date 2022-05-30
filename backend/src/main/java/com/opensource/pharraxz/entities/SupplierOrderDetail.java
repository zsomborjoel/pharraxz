package com.opensource.pharraxz.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("supplier_order_details")
public class SupplierOrderDetail extends OrderDetail {

    @Id
    @Column("supplier_order_detail_id")
    private Long id;

}