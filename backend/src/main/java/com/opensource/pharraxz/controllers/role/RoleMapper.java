package com.opensource.pharraxz.controllers.role;

import com.opensource.pharraxz.entities.Role;
import org.mapstruct.Mapper;

@Mapper
public interface RoleMapper {

    RoleDTO toDTO(Role role);

}
