package com.nikhil.sneakerhead.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.nikhil.sneakerhead.dto.SneakerDto;
import com.nikhil.sneakerhead.service.SneakerService;

import javax.validation.Valid;

import static org.springframework.http.ResponseEntity.status;

@RestController
@RequestMapping("/api/v1/sneakers")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SneakerController {

    @Autowired
    private SneakerService sneakerService;

    @GetMapping("/all")
    public ResponseEntity<?> getAll(){
        return status(200).body(sneakerService.getAll());
    }

    @GetMapping("/my-sneakers")
    public ResponseEntity<?> findMySneakers(){
        return status(200).body(sneakerService.findMySneakers());
    }

    @GetMapping("/by-id/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Long sneakerId){
        return status(200).body(sneakerService.findById(sneakerId));
    }

    @PostMapping()
    public ResponseEntity<?> addSneaker( @ModelAttribute SneakerDto sneakerDto){
        return status(201).body(sneakerService.addSneaker(sneakerDto));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateSneaker(@PathVariable("id") Long sneakerId, @RequestBody SneakerDto sneakerDto){
        return status(200).body(sneakerService.updateProduct(sneakerId, sneakerDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSneaker(@PathVariable("id") Long sneakerId){
        return status(200).body(sneakerService.deleteSneaker(sneakerId));
    }
}
