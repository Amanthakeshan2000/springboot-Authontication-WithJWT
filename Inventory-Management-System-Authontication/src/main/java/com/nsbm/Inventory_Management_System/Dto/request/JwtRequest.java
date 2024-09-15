package com.nsbm.Inventory_Management_System.Dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class JwtRequest {
    private int userId;
    private String userName;
    private String email;
    private String address;
    private String password;
}
