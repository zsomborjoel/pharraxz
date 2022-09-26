package com.opensource.pharraxz.controllers.user;

import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String firstname;
    private String lastname;
    private String username;
    private String password;
    private Long userPositionId;
    private Long roleId;
}
