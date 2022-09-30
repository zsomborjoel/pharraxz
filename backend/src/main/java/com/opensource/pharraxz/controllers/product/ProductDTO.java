package com.opensource.pharraxz.controllers.product;

import lombok.Data;

@Data
public class ProductDTO {
    private Long id;
    private String name;
    private String atc;
    private String atc_description;
    private Long supplierId;
    private String packaging;
    private String description;
    private String distributor;
    private String inn;
    private Boolean releasable;
    private String releasableBy;
}
