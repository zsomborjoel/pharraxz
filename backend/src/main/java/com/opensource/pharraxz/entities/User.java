package com.opensource.pharraxz.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.opensource.pharraxz.configs.security.Role;
import lombok.*;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Table("users")
@Getter
@Setter
@ToString
@Accessors(chain = true)
@AllArgsConstructor
@NoArgsConstructor
public class User implements UserDetails {

    @Id
    @Column("user_id")
    private Long userId;

    @Column("firstname")
    private String firstname;

    @Column("lastname")
    private String lastname;

    @Column("username")
    private String username;

    @JsonProperty @JsonIgnore
    @Column("password")
    private String password;

    @Column("enabled")
    private Boolean enabled;

    @Column("user_position_id")
    private Long userPositionId;

    @Transient
    private List<Role> roles = List.of(Role.ROLE_USER);

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream().map(a -> new SimpleGrantedAuthority(a.name())).toList();
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}
