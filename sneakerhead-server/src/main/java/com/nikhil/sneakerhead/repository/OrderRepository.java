package com.nikhil.sneakerhead.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nikhil.sneakerhead.model.Orders;
import com.nikhil.sneakerhead.model.User;

import java.util.List;

public interface OrderRepository extends JpaRepository<Orders, Long> {
    List<Orders> findByUser(User user);
}
