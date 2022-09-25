package com.opensource.pharraxz.controllers.supplier;

import com.opensource.pharraxz.entities.Supplier;
import org.mapstruct.Mapper;

@Mapper
public interface SupplierMapper {

    SupplierDTO toDTO(Supplier supplier);

    Supplier fromDTO(SupplierDTO supplier);

}
