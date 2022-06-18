package com.opensource.pharraxz.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("doctor_order_details")
public class DoctorOrderDetail extends OrderDetail {

    @Id
    @Column("doctor_order_detail_id")
    private Long id;

}