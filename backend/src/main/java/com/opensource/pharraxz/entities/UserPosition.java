package com.opensource.pharraxz.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("user_positions")
@Getter
@Setter
@ToString
@Accessors(chain = true)
@NoArgsConstructor
public class UserPosition {

    @Id
    @Column("user_position_id")
    private Long id;

    @Column("name")
    private String name;

    @Column("description")
    private String description;

}
