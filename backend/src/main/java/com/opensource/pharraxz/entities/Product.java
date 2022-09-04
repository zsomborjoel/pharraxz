package com.opensource.pharraxz.entities;

import lombok.*;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.Id;
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
    @Column("name")
    private String name;

    @Column("atc")
    private String atc;

    @Column("supplier_id")
    private Long supplierId;

    @Column("packaging")
    private String packaging;

    @Column("description")
    private String description;

    @Column("distributor")
    private String distributor;

    @Column("inn")
    private String inn;

    @Column("releasable")
    private Boolean releasable;

    @Column("releasable_by")
    private String releasableBy;
}
