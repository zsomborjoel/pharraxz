package com.opensource.pharraxz.controllers.pharmaorder;

import com.opensource.pharraxz.services.PharmaOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/orders")
@RequiredArgsConstructor
public class PharmaOrderController {

    private final PharmaOrderService pharmaOrderService;

}
