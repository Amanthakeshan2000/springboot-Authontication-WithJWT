package com.nsbm.Inventory_Management_System.Controller;

import com.nsbm.Inventory_Management_System.Dto.UserDto;
import com.nsbm.Inventory_Management_System.Services.ManageUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/users")
public class UserController {

        @Autowired
        private ManageUserService manageUserService;

        // GET all users
//        @GetMapping
//        public ResponseEntity<List<UserDto>> getAllUsers() {
//                List<UserDto> users = manageUserService.getAllUsers();
//                return ResponseEntity.ok(users);
//        }

        // GET user by ID
        @GetMapping("/{id}")
        public ResponseEntity<UserDto> getUserById(@PathVariable("id") long id) {
                Optional<UserDto> user = manageUserService.getUserById(id);
                return user.map(ResponseEntity::ok)
                        .orElseGet(() -> ResponseEntity.notFound().build());
        }

        // Get all users
        @GetMapping("/all")
        public ResponseEntity<List<UserDto>> getAllUsers() {
                List<UserDto> users = manageUserService.getAllUsers();
                return ResponseEntity.ok(users);
        }
        // New method to get user by email
        @GetMapping("/email/{email}")
        public ResponseEntity<UserDto> getUserByEmail(@PathVariable("email") String email) {
                Optional<UserDto> user = manageUserService.getUserByEmail(email);
                return user.map(ResponseEntity::ok)
                        .orElseGet(() -> ResponseEntity.notFound().build());
        }

        // UPDATE user by ID (PUT mapping)
        @PutMapping("/{id}")
        public ResponseEntity<UserDto> updateUser(@PathVariable("id") long id, @RequestBody UserDto userDto) {
                Optional<UserDto> updatedUser = manageUserService.updateUser(id, userDto);
                return updatedUser.map(ResponseEntity::ok)
                        .orElseGet(() -> ResponseEntity.notFound().build());
        }

        // DELETE user by ID
        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteUser(@PathVariable("id") long id) {
                boolean isDeleted = manageUserService.deleteUser(id);
                if (isDeleted) {
                        return ResponseEntity.noContent().build();
                } else {
                        return ResponseEntity.notFound().build();
                }
        }
}
