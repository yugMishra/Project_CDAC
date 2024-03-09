package com.project.sneakerhead.repository;

import com.project.sneakerhead.model.OrderItem;
import com.project.sneakerhead.model.Sneakers;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    List<OrderItem> findBySneakers(Sneakers sneakers);
}
