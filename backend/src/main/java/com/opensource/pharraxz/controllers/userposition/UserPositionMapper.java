package com.opensource.pharraxz.controllers.userposition;

import com.opensource.pharraxz.entities.UserPosition;
import org.mapstruct.Mapper;

@Mapper
public interface UserPositionMapper {

    UserPositionDTO toDTO(UserPosition userPosition);

}
