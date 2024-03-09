package com.project.sneakerhead.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.sneakerhead.model.Sneakers;
import com.project.sneakerhead.model.User;

import java.util.List;

public interface SneakerRepository extends JpaRepository<Sneakers, Long> {
    List<Sneakers> findByUser(User user);
}
