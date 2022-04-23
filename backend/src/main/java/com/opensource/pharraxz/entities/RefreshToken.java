package com.opensource.pharraxz.entities;


import lombok.*;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.time.Instant;

@Table("refresh_tokens")
@Getter
@Setter
@ToString
@Accessors(chain = true)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RefreshToken {

    @Id
    @Column("refresh_token_id")
    private Long refreshTokenId;

    @Column("user_id")
    private Long userId;

    @Column("token")
    private String token;

    @Column("expiry_date")
    private Instant expiryDate;

}
