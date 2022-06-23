package com.opensource.pharraxz.entities;

import lombok.*;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("products")
@Getter
@Setter
@ToString
@Builder
@Accessors(chain = true)
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    @Column("product_id")
    private Long productId;

    @Column("name")
    private String name;

    @Column("atc")
    private String atc;

    @Transient
    private Supplier supplier;

    @Column("register_number")
    private String registerNumber;

    @Column("packaging")
    private String packaging;

    @Column("description")
    private String description;

    @Column("inn")
    private String inn;

    @Column("releasable")
    private Boolean releasable;
}
