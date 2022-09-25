package com.opensource.pharraxz.controllers.supplier;

import lombok.Data;

@Data
public class SupplierDTO {
    private Long id;
    private String name;
    private String address;
    private String description;
    private String email;
    private String phone;
}
