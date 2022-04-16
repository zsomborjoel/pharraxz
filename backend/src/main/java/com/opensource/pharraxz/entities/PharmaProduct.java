package com.opensource.pharraxz.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("pharma_products")
@Getter
@Setter
@ToString
@Accessors(chain = true)
@NoArgsConstructor
public class PharmaProduct {

    @Id
    @Column("pharma_product_id")
    private Long pharmaProductId;

    @Column("name")
    private String name;

    @Column("atc")
    private String atc;

    @Column("supplier_id")
    private Long supplierId;

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
