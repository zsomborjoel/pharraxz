package com.opensource.pharraxz.controllers.supplier;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class SupplierDTO {
    private Long id;
    private String name;
    private String address;
    private String description;
    private String email;
    private String phone;
}
