package com.nikhil.sneakerhead.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nikhil.sneakerhead.model.Cart;
import com.nikhil.sneakerhead.model.User;

public interface CartRepository extends JpaRepository<Cart, Long> {
    public Cart findByUser(User user);
}
