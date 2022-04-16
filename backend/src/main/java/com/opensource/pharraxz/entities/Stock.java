package com.opensource.pharraxz.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("stock")
@Getter
@Setter
@ToString
@Accessors(chain = true)
@NoArgsConstructor
public class Stock {

    @Id
    @Column("stock_id")
    private Long stockId;

    @Column("pharma_product_id")
    private Long pharmaProductId;

    @Column("ward_id")
    private Long wardId;

    @Column("quantity")
    private Long quantity;

}
