package com.project.sneakerhead.repository;

import com.project.sneakerhead.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import com.project.sneakerhead.model.User;

public interface CartRepository extends JpaRepository<Cart, Long> {
    public Cart findByUser(User user);
}
