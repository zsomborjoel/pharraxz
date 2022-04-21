package com.opensource.pharraxz.routers.user;

import lombok.Data;

import java.util.List;

@Data
public class UserDTO {

    private String firstname;
    private String lastname;
    private List<String> roles;
}
