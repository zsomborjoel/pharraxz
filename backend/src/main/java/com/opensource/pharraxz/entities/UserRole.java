package com.opensource.pharraxz.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.domain.Persistable;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("user_roles")
@Getter
@Setter
@ToString
@SuperBuilder
@NoArgsConstructor
public class UserRole implements Persistable<Long> {

    @Id
    @Column("user_id")
    private Long userId;

    @Column("role_id")
    private Long roleId;

    @Transient
    private boolean newUserRole;

    @Override
    public Long getId() {
        return this.userId;
    }

    @Override
    @Transient
    public boolean isNew() {
        return this.newUserRole || userId == null;
    }

    public UserRole setAsNew() {
        this.newUserRole = true;
        return this;
    }

}
