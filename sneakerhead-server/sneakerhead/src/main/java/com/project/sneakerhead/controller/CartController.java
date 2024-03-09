package com.project.sneakerhead.controller;

import com.project.sneakerhead.dto.CartItemDto;
import com.project.sneakerhead.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.ResponseEntity.status;


@RestController
@RequestMapping("/api/v1/cart")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/")
    public ResponseEntity<?> findByCart(){
        return status(200).body(cartService.getMyCart());
    }

    @PostMapping("/")
    public ResponseEntity<?> addToCart(@RequestBody CartItemDto cartItemDto){
        return status(200).body(cartService.addToCart(cartItemDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFromCart(@PathVariable("id") Long cartItemId){
        return status(200).body(cartService.deleteFromCart(cartItemId));
    }
}
