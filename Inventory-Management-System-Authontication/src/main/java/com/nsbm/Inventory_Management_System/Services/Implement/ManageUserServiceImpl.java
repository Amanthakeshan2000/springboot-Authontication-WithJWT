package com.nsbm.Inventory_Management_System.Services.Implement;

import com.nsbm.Inventory_Management_System.Dto.UserDto;
import com.nsbm.Inventory_Management_System.Model.UserEnitiy;
import com.nsbm.Inventory_Management_System.Repository.UserRepo;
import com.nsbm.Inventory_Management_System.Services.ManageUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Component
@Service
public class ManageUserServiceImpl implements ManageUserService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public Optional<UserDto> getUserByEmail(String email) {
        Optional<UserEnitiy> user = userRepo.findByEmail(email); // Use the new repository method
        return user.map(this::convertToDto);
    }

//    @Override
//    public List<UserDto> getAllUsers() {
//        List<UserEnitiy> users = userRepo.findAll();
//        return users.stream().map(this::convertToDto).collect(Collectors.toList());
//    }
    @Override
    public List<UserDto> getAllUsers() {
        List<UserEnitiy> users = userRepo.findAllUser(); // Custom query method
        return users.stream().map(this::convertToDto).collect(Collectors.toList());
    }
    @Override
    public Optional<UserDto> getUserById(long id) {
        Optional<UserEnitiy> user = userRepo.findById(id);
        return user.map(this::convertToDto);
    }

    @Override
    public Optional<UserDto> updateUser(long id, UserDto userDto) {
        Optional<UserEnitiy> existingUser = userRepo.findById(id);
        if (existingUser.isPresent()) {
            UserEnitiy userEntity = existingUser.get();
            userEntity.setUserName(userDto.getUserName());
            userEntity.setEmail(userDto.getEmail());
            userEntity.setAddress(userDto.getAddress());
            userEntity.setPassword(userDto.getPassword());
            userRepo.save(userEntity);
            return Optional.of(convertToDto(userEntity));
        } else {
            return Optional.empty();
        }
    }

    @Override
    public boolean deleteUser(long id) {
        Optional<UserEnitiy> user = userRepo.findById(id);
        if (user.isPresent()) {
            userRepo.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    private UserDto convertToDto(UserEnitiy user) {
        return UserDto.builder()
                .id(user.getId())
                .userId(user.getUserId())
                .userName(user.getUserName())
                .email(user.getEmail())
                .address(user.getAddress())
                .password(user.getPassword())
                .build();
    }


}
