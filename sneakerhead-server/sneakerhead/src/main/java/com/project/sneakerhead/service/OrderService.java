package com.project.sneakerhead.service;

import com.project.sneakerhead.dto.OrderItemDto;
import com.project.sneakerhead.exception.ResourceNotFoundException;
import com.project.sneakerhead.model.*;
import com.project.sneakerhead.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.sneakerhead.dto.ChangeOrderStatusRequestDto;


import javax.mail.MessagingException;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private SneakerRepository sneakerRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private MailSenderService mailSenderService;

    public List<Orders> getMyOrders(){
        return orderRepository.findByUser(userService.getLoggedInUser());
    }

    public List<Orders> getAllOrders(){
        return orderRepository.findAll();
    }

    public Orders placeOrder(OrderItemDto[] orderDto) throws MessagingException, InterruptedException {
        User user = userService.getLoggedInUser();
        Orders orders = orderRepository.save(new Orders(user));

        Cart cart = cartRepository.findByUser(user);
        double total = 0d;
        String mailBody = "";
        for(int i=0;i<orderDto.length;i++){
            OrderItemDto orderItem = orderDto[i];
            Sneakers sneakers = sneakerRepository.findById(orderItem.getSneakerId()).orElseThrow(()-> new ResourceNotFoundException("Product not found"));
            int quantity = orderItem.getQuantity()<= sneakers.getStock()? orderItem.getQuantity() : sneakers.getStock();
            sneakers.setStock(sneakers.getStock()-quantity);
            sneakerRepository.save(sneakers);
            orderItemRepository.save(new OrderItem(sneakers, quantity, orders));
            String mailBodyText="<h3>Name: "+ sneakers.getName()+"</h3><br/><h3>Quantity: "+orderItem.getQuantity()+"</h3><br/><h3>Price: "+orderItem.getQuantity()*sneakers.getPrice()+"</h3></br>";
            mailBody+=mailBodyText;

            total = total + orderItem.getQuantity()*sneakers.getPrice();

        }

        mailBody+="<br/><h2>Total: "+total+"</h2>";
        Orders orders1 = orderRepository.findById(orders.getId()).orElseThrow(()-> new ResourceNotFoundException("Order not found"));
       mailSenderService.send(user, mailBody);

        System.out.println("Orders:  "+orders);
        return orders1;
    }

    public OrderItem changeStatus(Long orderId, ChangeOrderStatusRequestDto orderStatusRequestDto){
        OrderItem orderItem = orderItemRepository.findById(orderId).orElseThrow(()-> new ResourceNotFoundException("Order not found"));
        orderItem.setStatus(orderStatusRequestDto.getStatus());
        Sneakers sneakers = sneakerRepository.findById(orderItem.getProduct().getId()).orElseThrow(()-> new ResourceNotFoundException("Product not found"));
        if(orderStatusRequestDto.getStatus().equalsIgnoreCase("cancelled")){
            sneakers.setStock(sneakers.getStock()+orderItem.getQuantity());
            sneakerRepository.save(sneakers);
        }
        return orderItemRepository.save(orderItem);
    }
}
