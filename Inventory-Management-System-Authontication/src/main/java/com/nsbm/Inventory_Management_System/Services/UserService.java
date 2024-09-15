package com.nsbm.Inventory_Management_System.Services;

import com.nsbm.Inventory_Management_System.Dto.UserDto;
import com.nsbm.Inventory_Management_System.Dto.request.UserRequestDto;
import com.nsbm.Inventory_Management_System.Dto.response.UserResponseDto;
import com.nsbm.Inventory_Management_System.Model.UserEnitiy;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {
    List<UserResponseDto> getAllUser();
    public UserResponseDto createUser(UserRequestDto userRequestDto);

}