package com.project.sneakerhead.repository;

import com.project.sneakerhead.model.Orders;
import com.project.sneakerhead.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Orders, Long> {
    List<Orders> findByUser(User user);
}
