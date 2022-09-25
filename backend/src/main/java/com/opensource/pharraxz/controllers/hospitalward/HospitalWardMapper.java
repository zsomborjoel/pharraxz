package com.opensource.pharraxz.controllers.hospitalward;

import com.opensource.pharraxz.entities.HospitalWard;
import org.mapstruct.Mapper;

@Mapper
public interface HospitalWardMapper {

    HospitalWardDTO toDTO(HospitalWard hospitalWard);

    HospitalWard fromDTO(HospitalWardDTO hospitalWardDTO);

}
