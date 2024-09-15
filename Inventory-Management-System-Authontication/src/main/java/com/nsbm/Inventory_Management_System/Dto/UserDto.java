package com.nsbm.Inventory_Management_System.Dto;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class UserDto {
    private long id;
    private int userId;
    private String userName;
    private String email;
    private String address;
    private String password;
}
