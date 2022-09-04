package com.opensource.pharraxz.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("suppliers")
@Getter
@Setter
@ToString
@Accessors(chain = true)
@NoArgsConstructor
public class Supplier {

    @Id
    @Column("supplier_id")
    private Long id;

    @Column("name")
    private String name;

    @Column("address")
    private String address;

    @Column("description")
    private String description;

    @Column("email")
    private String email;

    @Column("phone")
    private String phone;
}
