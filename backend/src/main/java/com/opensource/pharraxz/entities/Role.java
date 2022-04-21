package com.opensource.pharraxz.entities;

import com.opensource.pharraxz.configs.security.RoleName;
import lombok.*;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("roles")
@Getter
@Setter
@ToString
@Accessors(chain = true)
@AllArgsConstructor
@NoArgsConstructor
public class Role {

    @Id
    @Column("role_id")
    private Long roleId;

    @Column("role_name")
    private RoleName roleName;

}
