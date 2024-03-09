package com.project.sneakerhead.service;


import com.project.sneakerhead.exception.ResourceNotFoundException;
import com.project.sneakerhead.model.Cart;
import com.project.sneakerhead.model.Sneakers;
import com.project.sneakerhead.model.User;
import com.project.sneakerhead.repository.CartRepository;
import com.project.sneakerhead.repository.SneakerRepository;
import org.modelmapper.internal.bytebuddy.pool.TypePool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.sneakerhead.dto.CartItemDto;
import com.project.sneakerhead.model.CartItem;
import com.project.sneakerhead.repository.CartItemRepository;

import java.util.Arrays;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private SneakerRepository sneakerRepository;

    public Cart getMyCart(){
        User user = userService.getLoggedInUser();
        return cartRepository.findByUser(user);
    }

    public Cart addToCart(CartItemDto cartItemDto){
        User user = userService.getLoggedInUser();
        Sneakers sneakers = sneakerRepository.findById(cartItemDto.getSneakerId()).orElseThrow(()-> new TypePool.Resolution.NoSuchTypeException("Product not found"));
        Cart cart = cartRepository.findByUser(user);
        if(cart==null) {
            cart = cartRepository.save(new Cart(Arrays.asList(), user, 0));
        }
        CartItem cartItem = cartItemRepository.save(new CartItem(sneakers,cart, cartItemDto.getQuantity()));

        cart.setTotalPrice(cart.getTotalPrice()+ sneakers.getPrice()*cartItem.getQuantity());
        cart = cartRepository.save(cart);
        return cart;
    }

    public Cart deleteFromCart(Long cartItemId){
        User user = userService.getLoggedInUser();
        CartItem cartItem = cartItemRepository.findById(cartItemId).orElseThrow(()-> new ResourceNotFoundException("Cart Item not found"));
        Cart cart = cartRepository.findByUser(user);
        cart.setTotalPrice(cart.getTotalPrice()-cartItem.getProduct().getPrice()+cartItem.getQuantity());
        cartItemRepository.deleteById(cartItemId);
        return cartRepository.save(cart);
    }

}
