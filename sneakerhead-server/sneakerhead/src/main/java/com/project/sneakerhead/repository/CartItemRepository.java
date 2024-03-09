package com.project.sneakerhead.repository;

import com.project.sneakerhead.model.Sneakers;
import org.springframework.data.jpa.repository.JpaRepository;

import com.project.sneakerhead.model.CartItem;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findBySneakers(Sneakers sneakers);

}
