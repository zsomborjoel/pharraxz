package com.opensource.pharraxz.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("atc_codes")
@Getter
@Setter
@ToString
@Accessors(chain = true)
@NoArgsConstructor
public class AtcCodes {

    @Id
    @Column("atc")
    private String atc;

    @Column("description")
    private String description;

}
