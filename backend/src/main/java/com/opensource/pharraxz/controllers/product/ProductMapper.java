package com.opensource.pharraxz.controllers.product;

import com.opensource.pharraxz.entities.Product;
import org.mapstruct.Mapper;

@Mapper
public interface ProductMapper {

    ProductDTO toDTO(Product product);

}
