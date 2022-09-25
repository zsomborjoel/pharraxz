package com.opensource.pharraxz.controllers.hospitalward;

import com.opensource.pharraxz.services.HospitalWardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/hospital-wards")
@RequiredArgsConstructor
public class HospitalWardController {

    private final HospitalWardService hospitalWardService;
    private final HospitalWardMapper hospitalWardMapper;

    @GetMapping
    public Flux<HospitalWardDTO> getAllHospitalWard() {
        return hospitalWardService.getAll()
                .map(hospitalWardMapper::toDTO);
    }

}
