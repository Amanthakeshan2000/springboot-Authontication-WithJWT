package com.nsbm.Inventory_Management_System.Dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequestDto {

    private int userId;
    private String userName;
    private String email;
    private String address;
    private String password;
}
