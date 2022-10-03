package com.opensource.pharraxz.controllers.releaseablecode;

import com.opensource.pharraxz.services.ReleaseAbleCodeService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@Tag(name = "ReleaseAble Code Controller")
@RestController
@RequestMapping("/release-able-codes")
@RequiredArgsConstructor
public class ReleaseAbleCodeController {

    private final ReleaseAbleCodeService releaseAbleCodeService;
    private final ReleaseAbleCodeMapper releaseAbleCodeMapper;

    @GetMapping
    public Flux<ReleaseAbleCodeDTO> getAllReleaseAbleCode() {
        return releaseAbleCodeService.getAll()
                .map(releaseAbleCodeMapper::toDTO);
    }

}
