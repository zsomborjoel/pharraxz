package com.opensource.pharraxz.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("hospital_ward")
@Getter
@Setter
@ToString
@Accessors(chain = true)
@NoArgsConstructor
public class HospitalWard {

    @Column("ward_id")
    private Long id;

    @Column("name")
    private String name;

}
