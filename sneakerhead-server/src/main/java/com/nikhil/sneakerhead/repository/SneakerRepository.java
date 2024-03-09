package com.nikhil.sneakerhead.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nikhil.sneakerhead.model.Sneakers;
import com.nikhil.sneakerhead.model.User;

import java.util.List;

public interface SneakerRepository extends JpaRepository<Sneakers, Long> {
    List<Sneakers> findByUser(User user);
}
