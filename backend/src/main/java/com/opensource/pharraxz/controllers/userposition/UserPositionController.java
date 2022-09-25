package com.opensource.pharraxz.controllers.userposition;

import com.opensource.pharraxz.services.UserPositionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/user-positions")
@RequiredArgsConstructor
public class UserPositionController {

    private final UserPositionService userPositionService;
    private final UserPositionMapper userPositionMapper;

    @GetMapping
    public Flux<UserPositionDTO> getAllUserPosition() {
        return userPositionService.getAll()
                .map(userPositionMapper::toDTO);
    }

}
