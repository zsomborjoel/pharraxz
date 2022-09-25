package com.opensource.pharraxz.controllers.user;

import com.opensource.pharraxz.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface UserMapper {

    @Mapping(target = "password", ignore = true)
    UserDTO toDTO(User user);

    User fromDTO(UserDTO userDTO);

}
