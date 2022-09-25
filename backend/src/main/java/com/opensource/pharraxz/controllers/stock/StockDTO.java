package com.opensource.pharraxz.controllers.stock;

import lombok.Data;

@Data
public class StockDTO {
    private Long id;
    private Long productId;
    private Long wardId;
    private Long quantity;
}
