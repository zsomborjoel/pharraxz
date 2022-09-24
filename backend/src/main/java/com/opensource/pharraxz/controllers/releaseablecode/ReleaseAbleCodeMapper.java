package com.opensource.pharraxz.controllers.releaseablecode;

import com.opensource.pharraxz.entities.ReleaseAbleCode;
import org.mapstruct.Mapper;

@Mapper
public interface ReleaseAbleCodeMapper {

    ReleaseAbleCodeDTO toDTO(ReleaseAbleCode releaseAbleCode);

}
