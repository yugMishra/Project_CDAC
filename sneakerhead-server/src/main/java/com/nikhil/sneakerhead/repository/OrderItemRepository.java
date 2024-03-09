package com.nikhil.sneakerhead.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nikhil.sneakerhead.model.OrderItem;
import com.nikhil.sneakerhead.model.Sneakers;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    List<OrderItem> findBySneakers(Sneakers sneakers);
}
