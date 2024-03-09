package com.nikhil.sneakerhead.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.nikhil.sneakerhead.dto.ChangeOrderStatusRequestDto;
import com.nikhil.sneakerhead.dto.OrderItemDto;
import com.nikhil.sneakerhead.service.OrderService;

import javax.mail.MessagingException;

import static org.springframework.http.ResponseEntity.status;

@RestController
@RequestMapping("/api/v1/orders")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/")
    public ResponseEntity<?> getMyOrders(){
        return status(200).body(orderService.getMyOrders());
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllOrders(){
        return status(200).body(orderService.getAllOrders());
    }

    @PostMapping("/")
    public ResponseEntity<?> placeOrder(@RequestBody OrderItemDto[] orderItemDtos) throws MessagingException, InterruptedException {
        return status(201).body(orderService.placeOrder(orderItemDtos));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> changeStatus(@RequestBody ChangeOrderStatusRequestDto changeOrderStatusRequestDto, @PathVariable("id") Long orderId){
        return status(200).body(orderService.changeStatus(orderId, changeOrderStatusRequestDto));
    }
}
