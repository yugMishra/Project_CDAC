package com.nikhil.sneakerhead.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.nikhil.sneakerhead.dto.SneakerDto;
import com.nikhil.sneakerhead.exception.ResourceNotFoundException;
import com.nikhil.sneakerhead.model.CartItem;
import com.nikhil.sneakerhead.model.OrderItem;
import com.nikhil.sneakerhead.model.Sneakers;
import com.nikhil.sneakerhead.model.User;
import com.nikhil.sneakerhead.repository.CartItemRepository;
import com.nikhil.sneakerhead.repository.OrderItemRepository;
import com.nikhil.sneakerhead.repository.SneakerRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Objects;

@Service
public class SneakerService {

    private final String BASE_URL = "http://localhost:8000";
    private Path fileStoragePath;

    @Autowired
    private SneakerRepository sneakerRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserService userService;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    public SneakerService() {
        try {
            fileStoragePath = Paths.get("src\\main\\resources\\static\\fileStorage").toAbsolutePath().normalize();
            Files.createDirectories(fileStoragePath);
        } catch (IOException e) {
            throw new RuntimeException("Issue in creating file directory");
        }
    }

    public List<Sneakers> getAll(){
        return sneakerRepository.findAll();
    }


    public List<Sneakers> findMySneakers(){
        User user = userService.getLoggedInUser();
        return sneakerRepository.findByUser(user);
    }

    public Sneakers findById(Long id){
        return sneakerRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Product not found"));
    }

    public Sneakers addSneaker(SneakerDto sneakerDto){
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(sneakerDto.getImage().getOriginalFilename()));
        fileName = fileName.replace(" ", "");
        Path filePath = Paths.get(fileStoragePath + "\\" + fileName);

        try {
            Files.copy(sneakerDto.getImage().getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            e.printStackTrace();
        }

        Sneakers sneakers = modelMapper.map(sneakerDto, Sneakers.class);
        sneakers.setUser(userService.getLoggedInUser());
        sneakers.setImageUrl(BASE_URL + "/fileStorage/" + fileName);
        return sneakerRepository.save(sneakers);
    }

    public Sneakers updateProduct(Long sneakerId, SneakerDto sneakerDto){
        Sneakers sneakers = sneakerRepository.findById(sneakerId).orElseThrow(()-> new ResourceNotFoundException("Product not found"));
        Sneakers sneakers1 = modelMapper.map(sneakerDto, Sneakers.class);
        sneakers1.setUser(userService.getLoggedInUser());
        sneakers1.setId(sneakerId);
        sneakers1.setImageUrl(sneakers.getImageUrl());
        return sneakerRepository.save(sneakers1);
    }

    public String deleteSneaker(Long sneakerId){
        Sneakers sneakers = sneakerRepository.findById(sneakerId).orElseThrow(()-> new ResourceNotFoundException("Product not found"));
        List<OrderItem> orderItem = orderItemRepository.findBySneakers(sneakers);
        List<CartItem> cartItem = cartItemRepository.findBySneakers(sneakers);
        orderItem.stream().forEach(orderItem1 -> orderItemRepository.deleteById(orderItem1.getId()));
        cartItem.stream().forEach(cartItem1 -> cartItemRepository.deleteById(cartItem1.getId()));
        sneakerRepository.deleteById(sneakerId);
        return "Sneaker deleted successfully";
    }
}
