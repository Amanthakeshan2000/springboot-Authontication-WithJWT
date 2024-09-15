package com.nsbm.Inventory_Management_System.Dto.response;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponseDto {
    private long  id;
    private int userId;
    private String userName;
    private String email;
    private String address;
    private String password;

}
