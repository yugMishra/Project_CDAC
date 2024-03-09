package com.nikhil.sneakerhead.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.nikhil.sneakerhead.config.JwtTokenProvider;
import com.nikhil.sneakerhead.dto.LoginRequest;
import com.nikhil.sneakerhead.dto.LoginResponse;
import com.nikhil.sneakerhead.dto.PasswordResetRequest;
import com.nikhil.sneakerhead.dto.UserDto;
import com.nikhil.sneakerhead.exception.ResourceNotFoundException;
import com.nikhil.sneakerhead.exception.UserAlreadyExistsException;
import com.nikhil.sneakerhead.model.User;
import com.nikhil.sneakerhead.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public User signup(UserDto userDto){

        User user = userRepository.findByEmail(userDto.getEmail());
        if(user!=null) throw new UserAlreadyExistsException("User with given email already exists");

        user = new User();

        user.setName(userDto.getName());
        user.setEmail(userDto.getEmail());
        user.setRole(userDto.getRole());
        user.setContactNumber(userDto.getContactNumber());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setAddress(userDto.getAddress());

        return userRepository.save(user);
    }

    public LoginResponse login(LoginRequest loginRequest){
        User user =  userRepository.findByEmail(loginRequest.getEmail());
        if(user==null) throw new ResourceNotFoundException("User with given email not found.");

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtTokenProvider.generateToken(authentication);

        return new LoginResponse(token, user);

    }

    public User updateUser(UserDto userDto, Long id){
        User user = userRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("User not found"));

        // if(user==null) throw new ResourceNotFoundException("User with given email does not exist");

        user.setName(userDto.getName());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setEmail(userDto.getEmail());
        user.setContactNumber(userDto.getContactNumber());
        user.setRole(userDto.getRole());
        user.setAddress(userDto.getAddress());
        return userRepository.save(user);
    }

    public User changePassword(PasswordResetRequest resetRequest){

        User user = userRepository.findByEmail(resetRequest.getEmail());
        if(user == null){
            throw new ResourceNotFoundException("No user found with given email.");
        }
        user.setPassword(passwordEncoder.encode(resetRequest.getPassword()));
        return userRepository.save(user);
    }


    public User getLoggedInUser(){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        System.out.println("User Details:  "+userDetails.getUsername());
        return userRepository.findByEmail(userDetails.getUsername());
    }

    public Optional<User> getUser(Long userId){
        return userRepository.findById(userId);
    }

    public String deleteUser(){
        User user = getLoggedInUser();
        userRepository.deleteById(user.getId());

        return "User deleted successfully";
    }

    public String deleteById(Long id) {
        if(getUser(id).isEmpty()) throw new ResourceNotFoundException("User not found");
        userRepository.deleteById(id);
        return "User deleted successfully";
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public String deleteAllUsers() {
        userRepository.deleteAll();
        return "All users deleted successfully";
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }
}
