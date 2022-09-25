package com.opensource.pharraxz.controllers.stock;

import com.opensource.pharraxz.entities.Stock;
import org.mapstruct.Mapper;

@Mapper
public interface StockMapper {

    StockDTO toDTO(Stock stock);

    Stock fromDTO(StockDTO stockDTO);

}
