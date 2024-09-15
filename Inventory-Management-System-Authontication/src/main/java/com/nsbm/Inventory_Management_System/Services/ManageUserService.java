package com.nsbm.Inventory_Management_System.Services;

import com.nsbm.Inventory_Management_System.Dto.UserDto;

import java.util.List;
import java.util.Optional;

public interface ManageUserService {
    List<UserDto> getAllUsers();

    Optional<UserDto> getUserByEmail(String email);

    Optional<UserDto> getUserById(long id);
    Optional<UserDto> updateUser(long id, UserDto userDto);
    boolean deleteUser(long id);
}
