package com.nikhil.sneakerhead.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nikhil.sneakerhead.model.CartItem;
import com.nikhil.sneakerhead.model.Sneakers;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findBySneakers(Sneakers sneakers);

}
