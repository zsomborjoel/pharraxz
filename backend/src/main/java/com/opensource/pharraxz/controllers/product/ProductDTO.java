package com.opensource.pharraxz.controllers.product;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class ProductDTO {
    private String name;
    private String atc;
    private Long supplierId;
    private String packaging;
    private String description;
    private String distributor;
    private String inn;
    private Boolean releasable;
    private String releasableBy;
}
