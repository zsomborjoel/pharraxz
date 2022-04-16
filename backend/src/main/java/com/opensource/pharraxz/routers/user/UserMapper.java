package com.opensource.pharraxz.routers.user;

import com.opensource.pharraxz.entities.User;
import org.mapstruct.Mapper;

@Mapper
public interface UserMapper {

    UserDTO toDTO(User user);

}
