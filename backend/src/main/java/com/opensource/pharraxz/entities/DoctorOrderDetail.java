package com.opensource.pharraxz.entities;

import lombok.*;
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
@NoArgsConstructor
@AllArgsConstructor
@Table("doctor_order_details")
public class DoctorOrderDetail extends OrderDetail {

    @Id
    @Column("doctor_order_detail_id")
    private Long id;

}